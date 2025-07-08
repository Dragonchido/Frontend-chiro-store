'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, ShoppingCart, TrendingUp } from 'lucide-react'
import { apiService } from '@/lib/api'
import { Service, OperatorType } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface ServicesGridProps {
  onOrderService: (service: Service, operator: OperatorType) => void
}

export function ServicesGrid({ onOrderService }: ServicesGridProps) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOperators, setSelectedOperators] = useState<Record<string, OperatorType>>({})

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      setLoading(true)
      const response = await apiService.getServices()
      
      if (response.success && response.data?.data) {
        setServices(response.data.data)
        setError(null)
      } else {
        setError(response.message || 'Failed to load services')
      }
    } catch {
      setError('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const handleOperatorChange = (serviceId: string, operator: OperatorType) => {
    setSelectedOperators(prev => ({
      ...prev,
      [serviceId]: operator
    }))
  }

  const handleOrder = (service: Service) => {
    const operator = selectedOperators[service.id] || 'any'
    onOrderService(service, operator)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading services...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={loadServices} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card key={service.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{service.name}</CardTitle>
              <Badge variant="secondary">ID: {service.id}</Badge>
            </div>
            <CardDescription>
              Virtual phone number for {service.name}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {service.pricing && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Original Price:</span>
                  <span className="text-sm line-through text-gray-500">
                    {formatCurrency(service.pricing.original_price)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium">Selling Price:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(service.pricing.selling_price)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Profit:</span>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {formatCurrency(service.pricing.profit)}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Operator:</label>
              <Select
                value={selectedOperators[service.id] || 'any'}
                onValueChange={(value: OperatorType) => handleOperatorChange(service.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Operator</SelectItem>
                  <SelectItem value="telkomsel">Telkomsel</SelectItem>
                  <SelectItem value="indosat">Indosat</SelectItem>
                  <SelectItem value="axis">Axis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={() => handleOrder(service)}
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Order Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}