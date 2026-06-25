import { z } from 'zod'

export const checkoutFormSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(300, 'Address must be less than 300 characters'),
  city: z
    .string()
    .min(2, 'City is required'),
  state: z
    .string()
    .min(2, 'State is required'),
  pincode: z
    .string()
    .regex(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
})

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateMobileNumber = (mobile: string): boolean => {
  const mobileRegex = /^[0-9]{10}$/
  return mobileRegex.test(mobile)
}

export const validatePincode = (pincode: string): boolean => {
  const pincodeRegex = /^[0-9]{6}$/
  return pincodeRegex.test(pincode)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
