export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  status_code?: number
  error?: string
}

export interface Service {
  id: string
  name: string
  price: string
  display_price?: number
  pricing?: {
    original_price: number
    markup_percentage: number
    fixed_markup: number
    selling_price: number
    profit: number
  }
}

export interface ServicesResponse {
  data: Service[]
}

export interface Order {
  id?: string
  order_id?: string
  service: string
  operator: OperatorType
  phone?: string
  status?: number
  sms?: string
  created_at?: string
}

export interface OrderRequest {
  service: string
  operator: OperatorType
}

export interface StatusRequest {
  order_id: string
}

export interface SetStatusRequest {
  order_id: string
  status: OrderStatus
}

export interface PricingInfo {
  original_price: number
  markup_percentage: number
  fixed_markup: number
  selling_price: number
  profit: number
}

export type OperatorType = 'telkomsel' | 'axis' | 'indosat' | 'any'

export enum OrderStatus {
  READY = 1,
  CANCEL = 2,
  RESEND = 3,
  COMPLETE = 4,
}

export interface HealthCheck {
  status: string
  service: string
  api_key_configured: boolean
  timestamp: string
  version: string
}