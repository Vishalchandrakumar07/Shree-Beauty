'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ProductsSection from '@/components/ProductsSection'
import AboutSection from '@/components/AboutSection'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import GuestCheckoutModal from '@/components/GuestCheckoutModal'
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton'

export default function Page() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <Footer />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <GuestCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </main>
  )
}
