'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Top */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                SB
              </div>

              <span className="text-xl font-bold text-green-600">
                {BUSINESS_INFO.name}
              </span>
            </div>

            <p className="text-gray-500 max-w-sm">
              {BUSINESS_INFO.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-gray-800 mb-3">
              Quick Links
            </h4>

            <div className="flex gap-6 justify-center md:justify-end">
              <a href="#home" className="text-gray-500 hover:text-green-600 transition">
                Home
              </a>

              <a href="#products" className="text-gray-500 hover:text-green-600 transition">
                Products
              </a>

              <a href="#about" className="text-gray-500 hover:text-green-600 transition">
                About
              </a>

              <a href="#contact" className="text-gray-500 hover:text-green-600 transition">
                Contact
              </a>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-gray-500 text-sm">
            Made with
            <Heart size={16} className="text-red-500 fill-red-500" />
            for natural beauty
          </p>
        </motion.div>

      </div>
    </footer>
  )
}