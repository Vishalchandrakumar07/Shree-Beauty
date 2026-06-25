import { AdminProvider } from '@/lib/admin-context'

export const metadata = {
  title: 'Shree Beauty - Admin Dashboard',
  description: 'Admin dashboard for Shree Beauty e-commerce',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  )
}
