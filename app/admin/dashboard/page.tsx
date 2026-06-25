'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import { supabase } from '@/lib/supabase'
import DashboardCards from '@/components/admin/DashboardCards'
import RecentOrders from '@/components/admin/RecentOrders'
import AnalyticsCharts from '@/components/admin/AnalyticsCharts'
import AdminHeader from '@/components/admin/AdminHeader'
import { LogOut } from 'lucide-react'
import type { Order } from '@/lib/types'

export default function AdminDashboard() {
  const router = useRouter()
  const { isAuthenticated, logout } = useAdmin()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalOrders: 0,
    ordersInProgress: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100)

        if (error) throw error

        const allOrders = (data as Order[]) || []
        setOrders(allOrders)

        // Calculate statistics
        const totalOrders = allOrders.length
        const ordersInProgress = allOrders.filter(
          (o) => o.status === 'pending' || o.status === 'processing'
        ).length
        const deliveredOrders = allOrders.filter((o) => o.status === 'delivered').length
        const cancelledOrders = allOrders.filter((o) => o.status === 'cancelled').length
        const totalRevenue = allOrders
          .filter((o) => o.status === 'delivered')
          .reduce((sum, o) => sum + (o.total_amount || 0), 0)

        setStats({
          totalOrders,
          ordersInProgress,
          deliveredOrders,
          cancelledOrders,
          totalRevenue,
        })
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s your business overview.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-effect p-6 rounded-lg animate-pulse h-32" />
            ))}
          </div>
        ) : (
          <>
            {/* Dashboard Cards */}
            <DashboardCards {...stats} />

            {/* Charts and Analytics */}
            <div className="mt-8">
              <AnalyticsCharts orders={orders} />
            </div>

            {/* Recent Orders */}
            <div className="mt-8">
              <RecentOrders orders={orders.slice(0, 10)} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
