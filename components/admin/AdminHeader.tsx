'use client'

import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import { LogOut, Home, Package } from 'lucide-react'
import Link from 'next/link'

interface AdminHeaderProps {
  onLogout: () => void
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  const router = useRouter()
  const { username } = useAdmin()

  const handleLogout = () => {
    onLogout()
    router.push('/admin/login')
  }

  return (
    <header className="bg-card border-b border-border/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-lg">
            <span className="text-primary font-bold text-lg">SB</span>
          </div>
          <div>
            <h1 className="text-foreground font-bold">Shree Beauty</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {/* Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="/admin/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Products
            </Link>
          </nav>

          {/* User Info */}
          <div className="flex items-center gap-4 pl-6 border-l border-border/30">
            <div className="text-right">
              <p className="text-foreground font-medium text-sm">{username}</p>
              <p className="text-muted-foreground text-xs">Administrator</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
