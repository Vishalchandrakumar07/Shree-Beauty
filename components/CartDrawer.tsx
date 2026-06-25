'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

export default function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart()
  const totalPrice = getTotalPrice()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-card shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted/10 rounded-lg transition-colors"
              >
                <X size={24} className="text-foreground" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <div className="text-4xl mb-4">🛍️</div>
                    <p className="text-foreground/60">Your cart is empty</p>
                    <p className="text-sm text-foreground/40 mt-2">Add some products to get started!</p>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.variantId}
                    className="flex gap-4 p-4 bg-muted/10 rounded-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-2xl">📦</div>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">{item.productName}</h4>
                      <p className="text-xs text-foreground/60">{item.sizeLabel}</p>
                      <p className="text-sm font-bold text-primary mt-1">₹{item.price * item.quantity}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="p-1 hover:bg-red-500/20 text-red-600 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="flex items-center gap-2 bg-background border border-border rounded">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="px-2 py-1 text-foreground/60 hover:text-foreground"
                        >
                          −
                        </button>
                        <span className="px-2 text-foreground text-sm font-semibold min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="px-2 py-1 text-foreground/60 hover:text-foreground"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70 font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-all duration-300"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-red-500/20 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
