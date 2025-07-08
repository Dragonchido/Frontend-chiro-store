import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}

export function getStatusColor(status: number): string {
  switch (status) {
    case 1:
      return 'text-green-600 bg-green-50'
    case 2:
      return 'text-red-600 bg-red-50'
    case 3:
      return 'text-yellow-600 bg-yellow-50'
    case 4:
      return 'text-blue-600 bg-blue-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

export function getStatusText(status: number): string {
  switch (status) {
    case 1:
      return 'Ready'
    case 2:
      return 'Cancelled'
    case 3:
      return 'Resend'
    case 4:
      return 'Complete'
    default:
      return 'Unknown'
  }
}

export function getOperatorColor(operator: string): string {
  switch (operator.toLowerCase()) {
    case 'telkomsel':
      return 'text-red-600 bg-red-50'
    case 'indosat':
      return 'text-yellow-600 bg-yellow-50'
    case 'axis':
      return 'text-purple-600 bg-purple-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}