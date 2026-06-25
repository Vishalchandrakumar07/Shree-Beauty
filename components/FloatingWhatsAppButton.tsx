'use client'

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { BUSINESS_INFO } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils/whatsapp'

export default function FloatingWhatsAppButton() {
  const whatsappLink = getWhatsAppLink(
    BUSINESS_INFO.whatsappNumber,
    'Hi! I would like to know more about your products.'
  )

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 pulse-glow-animation"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <MessageCircle size={24} />
    </motion.a>
  )
}
