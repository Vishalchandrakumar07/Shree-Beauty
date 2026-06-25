'use client'

import { motion } from 'framer-motion'
import { BUSINESS_INFO } from '@/lib/constants'

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">About {BUSINESS_INFO.name}</h2>
          <p className="text-lg text-foreground/60">Crafting nature&apos;s beauty with love and purity</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Image Placeholder */}
          <div className="h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
            <div className="text-6xl">🌿</div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-lg text-foreground/70 leading-relaxed">
              At {BUSINESS_INFO.name}, we believe that true beauty comes from nature. Our journey began with
              a simple mission: to create premium, natural beauty products that nourish your skin and spirit
              without harmful chemicals.
            </p>

            <p className="text-lg text-foreground/70 leading-relaxed">
              Every product is handmade with love, using only the finest organic ingredients sourced
              responsibly. We don&apos;t believe in shortcuts or compromises. Your beauty matters, and so does
              your health.
            </p>

            <div className="space-y-3 pt-4">
              <h3 className="font-bold text-foreground text-lg">Why Choose Us?</h3>
              {[
                '100% Natural & Organic Ingredients',
                'Handmade in Small Batches',
                'Cruelty-Free & Eco-Friendly',
                'No Harmful Chemicals or Additives',
                'Affordable Luxury Beauty',
                'Customer Satisfaction Guaranteed',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-lg">✓</span>
                  <span className="text-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
