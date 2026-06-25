'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils/whatsapp'

export default function ContactSection() {
  const whatsappLink = getWhatsAppLink(
    BUSINESS_INFO.whatsappNumber,
    'Hi! I would like to know more about your products.'
  )

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-lg text-foreground/60">We&apos;d love to hear from you</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">Contact Information</h3>

              <div className="space-y-6">
                {/* WhatsApp */}
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <MessageCircle className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp</p>
                    <p className="text-foreground/60">{BUSINESS_INFO.phone}</p>
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-foreground/60">{BUSINESS_INFO.email}</p>
                  </div>
                </motion.a>

                {/* Phone */}
                <motion.a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/10 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-foreground/60">{BUSINESS_INFO.phone}</p>
                  </div>
                </motion.a>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/10">
                  <MapPin className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-foreground/60">{BUSINESS_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Box */}
          <motion.div
            className="bg-card p-8 rounded-xl border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-foreground mb-6">Quick Message</h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  placeholder="Tell us how we can help..."
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-secondary transition-all"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
