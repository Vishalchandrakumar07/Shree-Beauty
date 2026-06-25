'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface AdminContextType {
  isAuthenticated: boolean
  isLoggedIn: boolean
  username: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('admin_auth')
    const storedUsername = localStorage.getItem('admin_username')
    
    if (storedAuth === 'true' && storedUsername) {
      setIsAuthenticated(true)
      setUsername(storedUsername)
    }
    setIsLoading(false)
  }, [])

  const login = async (inputUsername: string, password: string) => {
    // Admin credentials (in production, validate against backend/database)
    const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'ShreeBeauty@2024'

    if (inputUsername === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setUsername(inputUsername)
      localStorage.setItem('admin_auth', 'true')
      localStorage.setItem('admin_username', inputUsername)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUsername(null)
    localStorage.removeItem('admin_auth')
    localStorage.removeItem('admin_username')
  }

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, isLoggedIn: isAuthenticated, username, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
