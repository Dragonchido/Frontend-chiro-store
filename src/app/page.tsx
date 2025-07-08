'use client'

import { useState, Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ServicesGrid } from '@/components/services-grid'
import { OrderForm } from '@/components/order-form'
import { OrdersList } from '@/components/orders-list'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Service, OperatorType } from '@/types'
import { Phone, ShoppingCart, List, TrendingUp, Zap, Shield, Clock } from 'lucide-react'

export default function Home() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedOperator, setSelectedOperator] = useState<OperatorType>('any')
  const [showOrderForm, setShowOrderForm] = useState(false)

  const handleOrderService = (service: Service, operator: OperatorType) => {
    setSelectedService(service)
    setSelectedOperator(operator)
    setShowOrderForm(true)
  }

  const handleOrderComplete = () => {
    setShowOrderForm(false)
    setSelectedService(null)
    // You could add a toast notification here
  }

  const handleCancelOrder = () => {
    setShowOrderForm(false)
    setSelectedService(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ChiroStore</h1>
                <p className="text-sm text-gray-600">VirtuSIM Virtual Phone Numbers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Zap className="h-3 w-3 mr-1" />
                Live API
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                <Shield className="h-3 w-3 mr-1" />
                Secure
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Virtual Phone Numbers
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant access to virtual phone numbers from major Indonesian operators. 
            Perfect for SMS verification with transparent pricing and profit tracking.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Profit Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Real-time profit calculation with transparent markup system</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Instant Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Get your virtual number instantly with SMS forwarding</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Multi-Operator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Support for Telkomsel, Indosat, Axis, and more</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {showOrderForm && selectedService ? (
          <div className="mb-8">
            <OrderForm
              service={selectedService}
              operator={selectedOperator}
              onOrderComplete={handleOrderComplete}
              onCancel={handleCancelOrder}
            />
          </div>
        ) : (
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="services" className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Services
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center">
                <List className="h-4 w-4 mr-2" />
                My Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Available Services</CardTitle>
                  <CardDescription>
                    Choose from our wide range of virtual phone number services. 
                    All prices include our markup for your profit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<LoadingSpinner text="Loading services..." />}>
                    <ServicesGrid onOrderService={handleOrderService} />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-8">
              <Suspense fallback={<LoadingSpinner text="Loading orders..." />}>
                <OrdersList />
              </Suspense>
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2025 ChiroStore. Powered by VirtuSIM API. Built with Next.js and Tailwind CSS.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Professional virtual phone number service for businesses and developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
