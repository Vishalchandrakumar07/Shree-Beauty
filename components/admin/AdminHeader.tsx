'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import {
  LogOut,
  Home,
  Package,
  Menu,
  X,
} from 'lucide-react'
import Link from 'next/link'

interface AdminHeaderProps {
  onLogout: () => void
}

export default function AdminHeader({
  onLogout,
}: AdminHeaderProps) {
  const router = useRouter()
  const { username } = useAdmin()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    router.push('/admin/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-green-500 text-white flex items-center justify-center font-bold">
            SB
          </div>

          <div>
            <h1 className="font-bold text-gray-900">
              Shree Beauty
            </h1>

            <p className="text-xs text-gray-500">
              Admin Panel
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <nav className="flex gap-6">

            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-green-600"
            >
              <Home size={18} />
              Dashboard
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-2 text-gray-600 hover:text-green-600"
            >
              <Package size={18} />
              Products
            </Link>

          </nav>

          <div className="h-8 w-px bg-gray-200" />

          <div className="text-right">
            <p className="font-semibold text-sm">
              {username}
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <LogOut size={18} />
          </button>

        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">

          <nav className="flex flex-col p-4 gap-3">

            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <Home size={18} />
              Dashboard
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <Package size={18} />
              Products
            </Link>

            <div className="border-t my-2" />

            <div className="px-3">
              <p className="font-semibold">
                {username}
              </p>

              <p className="text-sm text-gray-500">
                Administrator
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>

          </nav>

        </div>
      )}
    </header>
  )
}