'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils/whatsapp'

export default function ContactSection() {
  const whatsappLink = getWhatsAppLink(
    BUSINESS_INFO.whatsappNumber,
    'Hi! I would like to know more about your products.'
  )

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h2>

          <p className="text-lg text-foreground/60 mb-10">
            Have a question or want to place an order?
            <br />
            Chat with us directly on WhatsApp.
          </p>

          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg"
          >
            <MessageCircle size={24} />
            Chat on WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}