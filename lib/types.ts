export interface CartItem {
  productId: string
  productName: string
  variantId: string
  sizeLabel: string
  price: number
  quantity: number
  imageUrl: string
}

export interface ProductVariant {
  id: string
  size_label: string
  price: number
  image_url?: string
}

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
  product_variants?: ProductVariant[]
}

export interface CheckoutFormData {
  customerName: string
  mobile: string
  address: string
  city: string
  state: string
  pincode: string
}

export interface OrderSubmission {
  customer_name: string
  mobile: string
  address: string
  city: string
  state: string
  pincode: string
  total_amount: number
  items_json: CartItem[]
}
