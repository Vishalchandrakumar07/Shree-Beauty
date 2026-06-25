'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const initializeDatabase = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('/api/setup-db', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Database tables created successfully! Please refresh and login to admin panel.')
      } else {
        setError(data.error || 'Failed to initialize database')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="glass-effect p-8 rounded-2xl backdrop-blur-xl border border-primary/20">
          <h1 className="text-4xl font-bold text-primary mb-4">Database Setup</h1>
          <p className="text-foreground/80 mb-8">
            Initialize the database tables for Shree Beauty. Click the button below to create all required tables.
          </p>

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={initializeDatabase}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
            >
              {loading ? 'Initializing Database...' : 'Initialize Database'}
            </Button>

            <Link href="/admin/login">
              <Button
                variant="outline"
                className="w-full py-6 text-lg font-semibold border-primary/20"
              >
                Go to Admin Login
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="font-semibold text-foreground mb-2">Tables Created:</h3>
            <ul className="text-sm text-foreground/80 space-y-1">
              <li>✓ products - Product catalog</li>
              <li>✓ product_variants - Product sizes/prices</li>
              <li>✓ orders - Customer orders</li>
              <li>✓ admin_users - Admin accounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
