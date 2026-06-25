'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Are all products 100% natural?',
    answer:
      'Yes, all our products are made with 100% natural and organic ingredients. We do not use any synthetic chemicals, parabens, or harmful additives.',
  },
  {
    question: 'How long do products last?',
    answer:
      'The shelf life varies by product, typically between 12-24 months. We recommend storing products in a cool, dry place away from direct sunlight.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Currently, we ship within India only. We are working on expanding our international reach soon.',
  },
  {
    question: 'Can I return products if unsatisfied?',
    answer:
      'We offer a 100% satisfaction guarantee. If you are not happy with your purchase, contact us within 7 days for a full refund or replacement.',
  },
  {
    question: 'Are products suitable for all skin types?',
    answer:
      'Most of our products are formulated for all skin types. However, we recommend reviewing ingredient lists and patch testing before full use, especially for sensitive skin.',
  },
  {
    question: 'How do I place a bulk order?',
    answer:
      'For bulk orders or corporate gifting, please contact us through WhatsApp with your requirements and we will provide a custom quote.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-foreground/60">Got questions? We have answers!</p>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="border border-border rounded-lg overflow-hidden bg-card"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 hover:bg-muted/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground text-left">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`text-primary transition-transform flex-shrink-0 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-foreground/70 border-t border-border">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
