'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { Product, CartItem } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const variants = product.variants || [{ id: '1', size_label: 'Standard', price: product.price }]
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const { addItem } = useCart()

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      variantId: selectedVariant.id,
      sizeLabel: selectedVariant.size_label,
      price: selectedVariant.price,
      quantity: 1,
      imageUrl: product.image_url,
    }
    addItem(cartItem)
  }

  return (
    <motion.div
      className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 product-card-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-muted/30 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          <div className="text-6xl font-bold text-primary/20">📦</div>
        </div>
        <span className="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{product.name}</h3>

        {/* Description */}
        <p className="text-sm text-foreground/60 mb-3 line-clamp-2">{product.description}</p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">₹{selectedVariant.price}</span>
        </div>

        {/* Variant Selector */}
        {variants.length > 1 && (
          <div className="mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 border border-border rounded-lg hover:bg-muted/10 transition-colors text-sm"
            >
              <span className="text-foreground/70">{selectedVariant.size_label}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            {isExpanded && (
              <motion.div
                className="absolute mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariant(variant)
                      setIsExpanded(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      variant.id === selectedVariant.id
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-foreground/70 hover:bg-muted/10'
                    }`}
                  >
                    {variant.size_label} - ₹{variant.price}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Benefits */}
        <div className="mb-4">
          <p className="text-xs text-primary font-semibold mb-2">Benefits:</p>
          <div className="flex flex-wrap gap-1">
            {product.benefits.split(',').slice(0, 3).map((benefit, idx) => (
              <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {benefit.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
          Add to Cart
        </button>

        {/* Expandable Details */}
        {isExpanded === false && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full mt-2 text-xs text-primary/70 hover:text-primary transition-colors"
          >
            View all variants
          </button>
        )}
      </div>
    </motion.div>
  )
}
