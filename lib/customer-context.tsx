'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Customer {
  id: string
  email: string
  name: string
  phone?: string
}

interface CustomerContextType {
  customer: Customer | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if customer is logged in on mount
  useEffect(() => {
    const storedCustomer = localStorage.getItem('customer')
    if (storedCustomer) {
      try {
        setCustomer(JSON.parse(storedCustomer))
      } catch (e) {
        localStorage.removeItem('customer')
      }
    }
  }, [])

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      const newCustomer = {
        id: data.data.id,
        email: data.data.email,
        name: data.data.name,
      }
      
      setCustomer(newCustomer)
      localStorage.setItem('customer', JSON.stringify(newCustomer))
      localStorage.setItem('customerToken', data.data.token)
    } catch (err: any) {
      setError(err.message || 'Signup failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      const loggedInCustomer = {
        id: data.data.id,
        email: data.data.email,
        name: data.data.name,
      }
      
      setCustomer(loggedInCustomer)
      localStorage.setItem('customer', JSON.stringify(loggedInCustomer))
      localStorage.setItem('customerToken', data.data.token)
    } catch (err: any) {
      setError(err.message || 'Login failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setCustomer(null)
    localStorage.removeItem('customer')
    localStorage.removeItem('customerToken')
    setError(null)
  }

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isLoggedIn: !!customer,
        login,
        signup,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomer() {
  const context = useContext(CustomerContext)
  if (context === undefined) {
    throw new Error('useCustomer must be used within CustomerProvider')
  }
  return context
}
