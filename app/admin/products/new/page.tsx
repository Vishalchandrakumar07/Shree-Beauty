'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import AdminHeader from '@/components/admin/AdminHeader'
import ImageUpload from '@/components/admin/ImageUpload'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CATEGORIES = [ 'Shampoos', 'Hair Oils', 'Soaps', 'Face Washe' ]

export default function NewProductPage() {
  const router = useRouter()
  const { isLoggedIn, logout } = useAdmin()
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
    variants: [] as Array<{ id: string; size_label: string; price: string; image_url: string }>,
  })

  const createVariant = () => ({
    id: `${Date.now()}-${Math.random()}`,
    size_label: '',
    price: '',
    image_url: '',
  })

  const handleVariantChange = (index: number, field: 'size_label' | 'price' | 'image_url', value: string) => {
    setFormData((prev) => {
      const variants = [...prev.variants]
      variants[index] = { ...variants[index], [field]: value }
      return { ...prev, variants }
    })
  }

  const addVariant = () => {
    setFormData((prev) => ({ ...prev, variants: [...prev.variants, createVariant()] }))
  }

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, idx) => idx !== index),
    }))
  }

  if (!isLoggedIn) {
    router.push('/admin/login')
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
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

    const validVariants = formData.variants
      .filter((variant) => variant.size_label.trim() && variant.price.trim())
      .map((variant) => ({
        size_label: variant.size_label,
        price: parseFloat(variant.price),
        image_url: variant.image_url,
      }))

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          variants: validVariants,
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
      <AdminHeader onLogout={handleLogout} />

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

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <label className="block text-sm font-medium text-foreground">
                  Flavours / Variants
                </label>
                <button
                  type="button"
                  onClick={addVariant}
                  className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                >
                  + Add Flavour
                </button>
              </div>

              {formData.variants.map((variant, index) => (
                <div key={variant.id} className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 border border-border rounded-lg bg-background">
                  <div className="lg:col-span-1 space-y-3">
                    <label className="block text-sm font-medium text-foreground">Flavour Name</label>
                    <input
                      type="text"
                      value={variant.size_label}
                      onChange={(e) => handleVariantChange(index, 'size_label', e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                      placeholder="e.g., Rose, Lavender"
                    />
                  </div>

                  <div className="lg:col-span-1 space-y-3">
                    <label className="block text-sm font-medium text-foreground">Price (₹)</label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                      placeholder="e.g., 199"
                      step="0.01"
                    />
                  </div>

                  <div className="lg:col-span-1 space-y-3">
                    <ImageUpload
                      label="Flavour Image"
                      currentImage={variant.image_url}
                      onImageUpload={(url) => handleVariantChange(index, 'image_url', url)}
                    />
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="inline-flex items-center justify-center rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
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
