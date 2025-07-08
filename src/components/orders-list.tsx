'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, RefreshCw, Phone, MessageSquare, Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { apiService } from '@/lib/api'
import { Order, OrderStatus } from '@/types'
import { getStatusColor, getStatusText, getOperatorColor } from '@/lib/utils'

export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.getActiveOrders()
      
      if (response.success && response.data) {
        setOrders(Array.isArray(response.data) ? response.data : [])
      } else {
        setError(response.message || 'Failed to load orders')
        setOrders([]) // Set empty array on error
      }
    } catch (err) {
      console.error('Error loading orders:', err)
      setError('Failed to connect to server')
      setOrders([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      setUpdatingStatus(orderId)
      const response = await apiService.updateOrderStatus({ order_id: orderId, status })
      
      if (response.success) {
        // Refresh orders after status update
        await loadOrders()
      } else {
        setError(response.message || 'Failed to update order status')
      }
    } catch {
      setError('Failed to update order status')
    } finally {
      setUpdatingStatus(null)
    }
  }

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 1:
        return <Clock className="h-4 w-4" />
      case 2:
        return <XCircle className="h-4 w-4" />
      case 3:
        return <RotateCcw className="h-4 w-4" />
      case 4:
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading orders...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={loadOrders} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Orders</h3>
        <p className="text-gray-600 mb-4">You don&apos;t have any active orders yet.</p>
        <Button onClick={loadOrders} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Active Orders</h2>
        <Button onClick={loadOrders} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id || order.order_id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Order #{order.id || order.order_id}
                </CardTitle>
                <Badge className={getStatusColor(order.status || 1)}>
                  <div className="flex items-center">
                    {getStatusIcon(order.status || 1)}
                    <span className="ml-1">{getStatusText(order.status || 1)}</span>
                  </div>
                </Badge>
              </div>
              <CardDescription>
                Service: {order.service}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Operator:</span>
                  <Badge className={`ml-2 ${getOperatorColor(order.operator)}`}>
                    {order.operator.charAt(0).toUpperCase() + order.operator.slice(1)}
                  </Badge>
                </div>

                {order.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="font-mono">{order.phone}</span>
                  </div>
                )}
              </div>

              {order.sms && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="text-sm font-medium">SMS Received:</span>
                  </div>
                  <p className="text-sm">{order.sms}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Update Status:</span>
                  <Select
                    disabled={updatingStatus === (order.id || order.order_id)}
                    onValueChange={(value) => updateOrderStatus(
                      order.id || order.order_id || '', 
                      parseInt(value) as OrderStatus
                    )}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ready</SelectItem>
                      <SelectItem value="2">Cancel</SelectItem>
                      <SelectItem value="3">Resend</SelectItem>
                      <SelectItem value="4">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {updatingStatus === (order.id || order.order_id) && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Updating...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}