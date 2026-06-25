import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      order_number,
      customer_name,
      mobile,
      address,
      city,
      state,
      pincode,
      total_amount,
      items_json,
    } = body

    // Validate required fields
    if (
      !order_number ||
      !customer_name ||
      !mobile ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !total_amount ||
      !items_json
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert order into database
    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert([
        {
          order_number,
          customer_name,
          mobile,
          address,
          city,
          state,
          pincode,
          total_amount,
          items_json,
          status: 'pending',
        },
      ])
      .select()

    if (error) {
      console.error('[API] Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to create order', details: error.message },
        { status: 500 }
      )
    }

    console.log('[API] Order created:', data)

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: data[0],
    })
  } catch (error) {
    console.error('[API] Error creating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Fetch all orders
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[API] Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch orders' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      count: data?.length || 0,
    })
  } catch (error) {
    console.error('[API] Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
