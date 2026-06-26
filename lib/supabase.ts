import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const createClientOrThrow = (url: string | undefined, key: string | undefined): SupabaseClient => {
  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY for server operations.'
    )
  }

  try {
    return createClient(url, key)
  } catch (error) {
    console.error('Supabase client initialization failed:', error)
    throw error
  }
}

export const supabase = createClientOrThrow(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClientOrThrow(supabaseUrl, supabaseServiceKey || supabaseAnonKey)

// Type definitions
export interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  ingredients: string
  benefits: string
  usage_instructions: string
  image_url: string
  variants?: ProductVariant[]
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  size_label: string
  price: number
  image_url?: string
  created_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  mobile: string
  address: string
  city: string
  state: string
  pincode: string
  total_amount: number
  status: string
  items_json: Array<{
    productId: string
    productName: string
    variantId: string
    sizeLabel: string
    price: number
    quantity: number
  }>
  notes: string
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  username: string
  email: string
  is_active: boolean
  last_login: string
  created_at: string
}
