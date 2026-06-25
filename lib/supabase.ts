import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client for browser use
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role (for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)

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
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  size_label: string
  price: number
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
