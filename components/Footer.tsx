'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid md:grid-cols-4 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                SB
              </div>
              <span className="font-bold text-primary">{BUSINESS_INFO.name}</span>
            </div>
            <p className="text-foreground/60 text-sm">{BUSINESS_INFO.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Products', href: '#products' },
                { label: 'About', href: '#about' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms & Conditions', href: '#' },
                { label: 'Return Policy', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
            <p className="text-foreground/60 text-sm mb-4">Subscribe to get special offers and updates</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-semibold text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-foreground/60 text-sm text-center sm:text-left">
            © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-foreground/60 text-sm">
            Made with <Heart size={16} className="text-red-500" /> for natural beauty
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
