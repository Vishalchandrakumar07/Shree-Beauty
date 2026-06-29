'use client'
//onChange
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAdmin } from '@/lib/admin-context'
import AdminHeader from '@/components/admin/AdminHeader'
import type { Order } from '@/lib/supabase'

export default function AdminDashboard() {
  const router = useRouter()
  const { isAuthenticated, logout } = useAdmin()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/orders', {
        cache: 'no-store',
      })

      const result = await response.json()

      if (result.success) {
        setOrders(result.data)
      } else {
        console.error(result.error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

    useEffect(() => {
        console.log("Orders:", orders)
        console.log("Total:", orders.length)
      }, [orders])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

   

    fetchOrders()
  }, [isAuthenticated])

  if (!isAuthenticated) return null

  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length

  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + Number(o.total_amount), 0)

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader
        onLogout={() => {
          logout()
          router.push('/admin/login')
        }}
      />

      <div className="max-w-7xl mx-auto p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={fetchOrders}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-gray-500">Total Orders</h2>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-gray-500">Pending</h2>
            <p className="text-3xl font-bold text-yellow-600">
              {pendingOrders}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-gray-500">Delivered</h2>
            <p className="text-3xl font-bold text-green-600">
              {deliveredOrders}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-gray-500">Revenue</h2>
            <p className="text-3xl font-bold text-blue-600">
              ₹{totalRevenue}
            </p>
          </div>

        </div>

        {/* Orders */}

        <div className="bg-white rounded-lg shadow">

          <div className="p-5 border-b">
            <h2 className="text-xl font-semibold">
              Latest Orders
            </h2>
          </div>

          {loading ? (
            <p className="p-6">Loading...</p>
          ) : orders.length === 0 ? (
            <p className="p-6">No orders found.</p>
          ) : (
            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>
                  <th className="text-left p-4">Order</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Mobile</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                </tr>

              </thead>

              <tbody>

                {orders.map(order => (

                  <tr key={order.id} className="border-t">

                    <td className="p-4">
                      {order.order_number}
                    </td>

                    <td className="p-4">
                      {order.customer_name}
                    </td>

                    <td className="p-4">
                      {order.mobile}
                    </td>

                    <td className="p-4">
                      ₹{order.total_amount}
                    </td>

                    <td className="p-4">

                      <select
                        value={order.status}
                        onChange={async (e) => {
                          const res = await fetch('/api/orders/status', {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              id: order.id,
                              status: e.target.value,
                            }),
                          })

                          const result = await res.json()

                          if (!result.success) {
                            alert(result.error)
                            return
                          }

                          fetchOrders()
                        }}
                        className="border rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          )}

        </div>

      </div>
    </div>
  )
}