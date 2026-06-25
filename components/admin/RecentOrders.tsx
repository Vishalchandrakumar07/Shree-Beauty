'use client'

import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils/validation'
import type { Order } from '@/lib/types'

interface RecentOrdersProps {
  orders: Order[]
}

const statusColors = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="glass-effect p-6 rounded-lg border border-border/50"
    >
      <h2 className="text-xl font-bold text-foreground mb-6">Recent Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                Order ID
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-muted-foreground">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                  <td className="py-4 px-4 text-sm font-mono text-foreground">
                    {order.id.slice(0, 8)}...
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">{order.customer_name}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-primary">
                    ₹{order.total_price.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[order.status as keyof typeof statusColors] ||
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {formatDate(new Date(order.created_at))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
