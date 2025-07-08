'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { apiService } from '@/lib/api'
import { Service, OperatorType } from '@/types'
import { formatCurrency, getOperatorColor } from '@/lib/utils'

interface OrderFormProps {
  service: Service
  operator: OperatorType
  onOrderComplete: () => void
  onCancel: () => void
}

export function OrderForm({ service, operator, onOrderComplete, onCancel }: OrderFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmitOrder = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiService.createOrder({
        service: service.id,
        operator
      })

      if (response.success && response.data) {
        setSuccess(true)
        setTimeout(() => {
          onOrderComplete()
        }, 1500)
      } else {
        setError(response.message || 'Failed to create order')
      }
    } catch {
      setError('Failed to create order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Order Confirmation
          {success && <CheckCircle className="h-5 w-5 text-green-600" />}
        </CardTitle>
        <CardDescription>
          Review your order details before confirming
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Service:</span>
            <span>{service.name}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Service ID:</span>
            <Badge variant="secondary">{service.id}</Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Operator:</span>
            <Badge className={getOperatorColor(operator)}>
              {operator.charAt(0).toUpperCase() + operator.slice(1)}
            </Badge>
          </div>

          {service.pricing && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-medium">Original Price:</span>
                <span className="line-through text-gray-500">
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
                <span className="font-medium">Your Profit:</span>
                <span className="font-bold text-green-600">
                  {formatCurrency(service.pricing.profit)}
                </span>
              </div>
            </>
          )}
        </div>

        {error && (
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
            <XCircle className="h-4 w-4 text-red-600 mr-2" />
            <span className="text-red-600 text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-green-600 text-sm">Order created successfully!</span>
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading || success}
            className="flex-1"
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleSubmitOrder}
            disabled={loading || success}
            className="flex-1"
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {success ? 'Order Created!' : 'Confirm Order'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}