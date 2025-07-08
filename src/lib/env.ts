// Environment variables with fallbacks and validation
export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://minatoz997-chirostore.hf.space',
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const

// Validate required environment variables
export function validateEnv() {
  const required = ['NEXT_PUBLIC_API_URL'] as const
  const missing: string[] = []
  
  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key)
    }
  }
  
  if (missing.length > 0 && ENV.IS_PRODUCTION) {
    console.warn('Missing environment variables:', missing)
    console.warn('Using fallback values for production deployment')
  }
  
  return {
    isValid: missing.length === 0,
    missing,
    config: ENV
  }
}

// Initialize environment validation
if (typeof window === 'undefined') {
  // Only run on server-side
  validateEnv()
}