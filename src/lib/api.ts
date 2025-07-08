import { 
  ApiResponse, 
  ServicesResponse, 
  Order, 
  OrderRequest, 
  SetStatusRequest, 
  PricingInfo, 
  HealthCheck 
} from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://minatoz997-chirostore.hf.space'

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  async getServices(): Promise<ApiResponse<ServicesResponse>> {
    return this.request<ServicesResponse>('/services')
  }

  async createOrder(orderData: OrderRequest): Promise<ApiResponse<Order>> {
    return this.request<Order>('/order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  async getActiveOrders(): Promise<ApiResponse<Order[]>> {
    return this.request<Order[]>('/active-orders')
  }

  async getOrderStatus(orderId: string): Promise<ApiResponse<Order>> {
    return this.request<Order>(`/status/${orderId}`)
  }

  async updateOrderStatus(statusData: SetStatusRequest): Promise<ApiResponse<unknown>> {
    return this.request('/status', {
      method: 'PUT',
      body: JSON.stringify(statusData),
    })
  }

  async calculatePricing(originalPrice: number): Promise<ApiResponse<PricingInfo>> {
    return this.request<PricingInfo>(`/pricing/${originalPrice}`)
  }

  async getHealthCheck(): Promise<ApiResponse<HealthCheck>> {
    return this.request<HealthCheck>('/health')
  }
}

export const apiService = new ApiService()