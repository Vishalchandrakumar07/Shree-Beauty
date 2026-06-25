import { BUSINESS_INFO } from '@/lib/constants'
import { CartItem } from '@/lib/types'

export interface WhatsAppMessageData {
  customerName: string
  mobile: string
  orderNumber: string
  items: CartItem[]
  totalAmount: number
  address: string
  city: string
  state: string
  pincode: string
}

export const generateWhatsAppMessage = (data: WhatsAppMessageData): string => {
  const itemsList = data.items
    .map((item) => `• ${item.productName} (${item.sizeLabel}) x${item.quantity} - ₹${item.price * item.quantity}`)
    .join('\n')

  const message = `
🛍️ *New Order from ${BUSINESS_INFO.name}*

📋 *Order Details:*
Order ID: ${data.orderNumber}
Customer: ${data.customerName}
Mobile: ${data.mobile}

📦 *Products:*
${itemsList}

💰 *Total Amount:* ₹${data.totalAmount}

📍 *Delivery Address:*
${data.address}
${data.city}, ${data.state} - ${data.pincode}

---
Thank you for your order! We will confirm shortly.
`.trim()

  return message
}

export const openWhatsApp = (data: WhatsAppMessageData) => {
  const message = generateWhatsAppMessage(data)
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodedMessage}`

  // Check if in iframe
  if (window.self !== window.top) {
    window.open(whatsappUrl, '_blank')
  } else {
    window.location.href = whatsappUrl
  }
}

export const getWhatsAppLink = (phoneNumber: string, message: string = ''): string => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}
