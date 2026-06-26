'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import AdminHeader from '@/components/admin/AdminHeader'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types'

export default function ProductsPage() {
  const router = useRouter()
  const { isLoggedIn, logout } = useAdmin()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin/login')
      return
    }

    fetchProducts()
  }, [isLoggedIn, router])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      if (data.success) {
        setProducts(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (!isLoggedIn) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products Management</h1>
            <p className="text-muted-foreground mt-2">Add, edit, or delete products</p>
          </div>
          <Link href="/admin/products/new">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              + Add New Product
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-card p-8 rounded-lg border border-border text-center">
            <p className="text-muted-foreground mb-4">No products found</p>
            <Link href="/admin/products/new">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Create First Product
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-card p-4 rounded-lg border border-border flex justify-between items-start hover:border-primary/50 transition"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-primary font-semibold mt-2">₹{product.price}</p>
                  {product.description && (
                    <p className="text-sm text-foreground/70 mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <Button
                      variant="outline"
                      className="border-primary/20 text-primary hover:bg-primary/10"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
