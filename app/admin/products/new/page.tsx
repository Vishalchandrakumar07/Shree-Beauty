'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import AdminHeader from '@/components/admin/AdminHeader'
import ImageUpload from '@/components/admin/ImageUpload'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CATEGORIES = ['Soaps', 'Shampoos', 'Hair Oils', 'Face Washes']

export default function NewProductPage() {
  const router = useRouter()
  const { isLoggedIn } = useAdmin()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    category: 'Soaps',
    price: '',
    description: '',
    ingredients: '',
    benefits: '',
    usage_instructions: '',
    image_url: '',
  })

  if (!isLoggedIn) {
    router.push('/admin/login')
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required')
      setLoading(false)
      return
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Valid price is required')
      setLoading(false)
      return
    }
    if (!formData.category) {
      setError('Category is required')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Product created successfully! Redirecting...')
        setTimeout(() => {
          router.push('/admin/products')
        }, 1500)
      } else {
        setError(data.error || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      setError('Failed to create product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin/products">
            <Button variant="outline" className="mb-4">
              ← Back to Products
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600">
            {success}
          </div>
        )}

        <div className="bg-card p-8 rounded-lg border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                  placeholder="e.g., Lavender Soap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                  placeholder="e.g., 499"
                />
              </div>

              <div className="md:col-span-2">
                <ImageUpload
                  onImageUpload={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
                  currentImage={formData.image_url}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                placeholder="Product description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Ingredients
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                placeholder="List of ingredients..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Benefits
              </label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                placeholder="Product benefits..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Usage Instructions
              </label>
              <textarea
                name="usage_instructions"
                value={formData.usage_instructions}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                placeholder="How to use..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-2"
              >
                {loading ? 'Creating...' : 'Create Product'}
              </Button>
              <Link href="/admin/products" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-primary/20"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
