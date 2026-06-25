import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { products as defaultProducts } from '@/data/products'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    // Try to fetch from Supabase first
    let query = supabaseAdmin.from('products').select('*')

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      console.log('[API] Supabase error, using default products:', error.message)
      // Fallback to default products
      let filteredProducts = defaultProducts
      if (category) {
        filteredProducts = defaultProducts.filter((p) => p.category === category)
      }
      return NextResponse.json({
        success: true,
        data: filteredProducts,
        count: filteredProducts.length,
      })
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    })
  } catch (error) {
    console.error('[API] Error fetching products:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, price, description, ingredients, benefits, usage_instructions, image_url } = body

    if (!name || !category || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([
        {
          name,
          category,
          price,
          description,
          ingredients,
          benefits,
          usage_instructions,
          image_url,
        },
      ])
      .select()

    if (error) {
      console.error('[API] Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data[0],
    })
  } catch (error: any) {
    console.error('[API] Error creating product:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    )
  }
}
