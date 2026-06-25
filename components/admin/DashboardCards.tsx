'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Clock, CheckCircle, XCircle } from 'lucide-react'

interface DashboardCardsProps {
  totalOrders: number
  ordersInProgress: number
  deliveredOrders: number
  cancelledOrders: number
  totalRevenue: number
}

export default function DashboardCards({
  totalOrders,
  ordersInProgress,
  deliveredOrders,
  cancelledOrders,
  totalRevenue,
}: DashboardCardsProps) {
  const cards = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'from-primary to-secondary',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
    },
    {
      title: 'Orders In Progress',
      value: ordersInProgress,
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-600',
    },
    {
      title: 'Delivered Orders',
      value: deliveredOrders,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-600',
    },
    {
      title: 'Cancelled Orders',
      value: cancelledOrders,
      icon: XCircle,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-effect p-6 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-2">
                  {card.title}
                </p>
                <h3 className="text-3xl font-bold text-foreground">{card.value}</h3>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Revenue Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="glass-effect p-6 rounded-lg border border-border/50 hover:border-primary/30 transition-colors md:col-span-2 lg:col-span-4"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-2">
              Total Revenue
            </p>
            <h3 className="text-3xl font-bold text-primary">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
