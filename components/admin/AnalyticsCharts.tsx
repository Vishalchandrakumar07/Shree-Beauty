'use client'

import { motion } from 'framer-motion'
import type { Order } from '@/lib/supabase'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface AnalyticsChartsProps {
  orders: Order[]
}

export default function AnalyticsCharts({ orders }: AnalyticsChartsProps) {
  // Prepare data for revenue over time (last 7 days)
  const revenueData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const dateStr = date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    const revenue = orders
      .filter((order) => {
        const orderDate = new Date(order.created_at)
        return (
          orderDate.toDateString() === date.toDateString() && order.status === 'delivered'
        )
      })
      .reduce((sum, order) => sum + order.total_amount, 0)
    return { date: dateStr, revenue }
  })

  // Status distribution
  const statusCounts = {
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  }

  const statusData = [
    { name: 'Pending', value: statusCounts.pending, fill: '#FBBF24' },
    { name: 'Processing', value: statusCounts.processing, fill: '#60A5FA' },
    { name: 'Delivered', value: statusCounts.delivered, fill: '#34D399' },
    { name: 'Cancelled', value: statusCounts.cancelled, fill: '#F87171' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="glass-effect p-6 rounded-lg border border-border/50"
      >
        <h2 className="text-lg font-bold text-foreground mb-4">Revenue Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis stroke="#ffffff50" />
            <YAxis stroke="#ffffff50" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#C2185B"
              strokeWidth={2}
              dot={{ fill: '#C2185B' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Status Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="glass-effect p-6 rounded-lg border border-border/50"
      >
        <h2 className="text-lg font-bold text-foreground mb-4">Order Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Order Count Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="glass-effect p-6 rounded-lg border border-border/50 lg:col-span-2"
      >
        <h2 className="text-lg font-bold text-foreground mb-4">Order Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis stroke="#ffffff50" dataKey="name" />
            <YAxis stroke="#ffffff50" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            />
            <Bar dataKey="value" fill="#C2185B" radius={[8, 8, 0, 0]}>
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
