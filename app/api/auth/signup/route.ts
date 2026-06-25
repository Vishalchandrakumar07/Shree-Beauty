import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if customer already exists
    const { data: existingCustomer } = await supabaseAdmin
      .from('customers')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Create new customer
    const { data, error } = await supabaseAdmin
      .from('customers')
      .insert([
        {
          name,
          email: email.toLowerCase(),
          password_hash: password, // In production, use proper hashing (bcrypt)
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('[API] Signup error:', error)
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      )
    }

    const customer = data[0]
    const token = Buffer.from(`${customer.id}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      success: true,
      data: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        token,
      },
    })
  } catch (error: any) {
    console.error('[API] Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Signup failed' },
      { status: 500 }
    )
  }
}
