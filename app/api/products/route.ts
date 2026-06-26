import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { products as defaultProducts } from '@/data/products'

const ensureSupabaseAdmin = () => {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client is not configured')
  }
  return supabaseAdmin
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    // Try to fetch from Supabase first
    const admin = ensureSupabaseAdmin()
    let query = admin.from('products').select('*, product_variants(*)')

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

    const products = (data || []).map((product: any) => ({
      ...product,
      variants: product.product_variants || [],
    }))

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    })
  } catch (error) {
    console.error('[API] Error fetching products:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, price, description, ingredients, benefits, usage_instructions, image_url, variants } = body

    if (!name || !category || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data: insertedProducts, error: productError } = await supabaseAdmin
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

    if (productError) {
      console.error('[API] Supabase error:', productError)
      return NextResponse.json(
        { error: productError.message },
        { status: 500 }
      )
    }

    const createdProduct = insertedProducts?.[0]

    let insertedVariants = []
    if (Array.isArray(variants) && variants.length > 0) {
      const variantsToInsert = variants.map((variant: any) => {
        const row: any = {
          product_id: createdProduct.id,
          size_label: variant.size_label,
          price: variant.price,
        }

        if (variant.image_url) {
          row.image_url = variant.image_url
        }

        return row
      })

      const { data: variantData, error: variantError } = await supabaseAdmin
        .from('product_variants')
        .insert(variantsToInsert)
        .select()

      if (variantError) {
        console.error('[API] Supabase variants error:', variantError)
        return NextResponse.json(
          { error: variantError.message },
          { status: 500 }
        )
      }

      insertedVariants = variantData || []
    }

    return NextResponse.json({
      success: true,
      data: {
        ...createdProduct,
        variants: insertedVariants,
      },
    })
  } catch (error: any) {
    console.error('[API] Error creating product:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    )
  }
}
