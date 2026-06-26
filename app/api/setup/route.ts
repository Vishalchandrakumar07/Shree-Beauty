import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Missing Supabase credentials' },
      { status: 400 }
    )
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)

  try {
    // Create products table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS products (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          description TEXT,
          ingredients TEXT,
          benefits TEXT,
          usage_instructions TEXT,
          image_url VARCHAR(500),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    })

    // Create product variants table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS product_variants (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
          size_label VARCHAR(100) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          image_url VARCHAR(500),
          created_at TIMESTAMP DEFAULT NOW()
        );
      `,
    })

    // Ensure image_url column exists for flavour variants
    await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE product_variants ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);`,
    })

    // Create orders table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS orders (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          order_number VARCHAR(50) UNIQUE NOT NULL,
          customer_name VARCHAR(255) NOT NULL,
          mobile VARCHAR(20) NOT NULL,
          address TEXT NOT NULL,
          city VARCHAR(100),
          state VARCHAR(100),
          pincode VARCHAR(20),
          total_amount DECIMAL(10, 2) NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          items_json JSONB NOT NULL,
          notes TEXT,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    })

    // Create admin users table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS admin_users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          username VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(500) NOT NULL,
          email VARCHAR(255),
          is_active BOOLEAN DEFAULT TRUE,
          last_login TIMESTAMP,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `,
    })

    return NextResponse.json({ success: true, message: 'Tables created successfully' })
  } catch (error: any) {
    console.error('Database setup error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to setup database' },
      { status: 500 }
    )
  }
}
