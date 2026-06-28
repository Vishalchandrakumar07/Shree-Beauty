'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutFormSchema, CheckoutFormData } from '@/lib/utils/validation'
import { useCart } from '@/lib/cart-context'
import { openWhatsApp } from '@/lib/utils/whatsapp'

interface GuestCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GuestCheckoutModal({ isOpen, onClose }: GuestCheckoutModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { items, getTotalPrice, clearCart } = useCart()
  const totalPrice = getTotalPrice()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
  })

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      alert('Your cart is empty!')
      return
    }

    setIsSubmitting(true)

    try {
      // Generate order number
      const orderNumber = `SB-${Date.now()}`

      // Save order to database
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_number: orderNumber,
          customer_name: data.customerName,
          mobile: data.mobile,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          total_amount: totalPrice,
          items_json: items,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      // Open WhatsApp with order details
      openWhatsApp({
        customerName: data.customerName,
        mobile: data.mobile,
        orderNumber,
        items,
        totalAmount: totalPrice,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      })

      // Clear cart and close modal
      clearCart()
      reset()
      onClose()

      alert('Order placed successfully! Check WhatsApp for confirmation.')
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-51 p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <motion.div className="bg-card rounded-xl shadow-2xl max-w-md w-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Complete Your Order</h2>
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="p-1 hover:bg-muted/10 rounded transition-colors disabled:opacity-50"
                >
                  <X size={24} className="text-foreground" />
                </button>
              </div>

              {/* Order Summary */}
              <div className="bg-muted/10 p-4 rounded-lg mb-6">
                <p className="text-sm text-foreground/60 mb-2">Order Total</p>
                <p className="text-2xl font-bold text-primary">₹{totalPrice}</p>
                <p className="text-xs text-foreground/60 mt-2">{items.length} item(s)</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                  <input
                      {...register('customerName', {
                        required: 'Full Name is required',
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: 'Name can only contain letters and spaces',
                        },
                      })}
                      type="text"
                      inputMode="text"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '')
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />

                    {errors.customerName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.customerName.message}
                      </p>
                    )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Mobile Number *</label>
                  <input
                    {...register('mobile')}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    placeholder="9876543210"
                    disabled={isSubmitting}
                  />
                  {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile.message}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Address *</label>
                  <textarea
                    {...register('address')}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50"
                    placeholder="Street address"
                    rows={2}
                    disabled={isSubmitting}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">City *</label>
                    <input
                      {...register('city')}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      placeholder="Bangalore"
                      disabled={isSubmitting}
                    />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">State *</label>
                    <input
                      {...register('state')}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      placeholder="Karnataka"
                      disabled={isSubmitting}
                    />
                    {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
                  </div>
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Pincode *</label>
                  <input
                    {...register('pincode')}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    placeholder="560001"
                    disabled={isSubmitting}
                  />
                  {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>

                <p className="text-xs text-foreground/60 text-center mt-4">
                  You&apos;ll be redirected to WhatsApp to confirm your order
                </p>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
