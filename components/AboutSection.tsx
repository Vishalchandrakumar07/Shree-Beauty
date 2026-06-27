'use client'

import { motion } from 'framer-motion'
import { BUSINESS_INFO } from '@/lib/constants'
import Image from 'next/image'


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
          {/* Product Image */}
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="/logo.jpeg"
                alt="Shree Beauty"
                fill
                className="object-cover"
                priority
              />
            </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-lg text-foreground/70 leading-relaxed">
             Shree Organic Cosmetics offers a premium range of organic soaps, herbal shampoos, natural oils, and personal care products crafted from carefully selected natural ingredients.        
            </p>

            <p className="text-lg text-foreground/70 leading-relaxed">
               Our goal is to provide safe, effective, and eco-friendly beauty solutions that promote healthy skin and hair while embracing the goodness of nature. We are committed to quality, purity, and customer satisfaction in every product we create.
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
