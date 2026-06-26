import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const ensureSupabaseAdmin = () => {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client is not configured')
  }
  return supabaseAdmin
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const admin = ensureSupabaseAdmin()
    const { data, error } = await admin
      .from('products')
      .select('*, product_variants(*)')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      )
    }

    const product = {
      ...data,
      variants: data?.product_variants || [],
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error: any) {
    console.error('[API] Error fetching product:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { name, category, price, description, ingredients, benefits, usage_instructions, image_url, variants } = body

    const admin = ensureSupabaseAdmin()
    const { data: updatedProducts, error: productError } = await admin
      .from('products')
      .update({
        name,
        category,
        price,
        description,
        ingredients,
        benefits,
        usage_instructions,
        image_url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()

    if (productError) {
      console.error('[API] Supabase error:', productError)
      return NextResponse.json(
        { error: productError.message },
        { status: 500 }
      )
    }

    if (Array.isArray(variants)) {
      const { error: deleteError } = await admin
        .from('product_variants')
        .delete()
        .eq('product_id', id)

      if (deleteError) {
        console.error('[API] Supabase delete variants error:', deleteError)
        return NextResponse.json(
          { error: deleteError.message },
          { status: 500 }
        )
      }

      if (variants.length > 0) {
const variantsToInsert = variants.map((variant: any) => {
        const row: any = {
          product_id: id,
          size_label: variant.size_label,
          price: variant.price,
        }

        if (variant.image_url) {
          row.image_url = variant.image_url
        }

        return row
      })

        const { data: variantData, error: variantError } = await admin
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

        return NextResponse.json({
          success: true,
          data: {
            ...updatedProducts[0],
            variants: variantData,
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ...updatedProducts[0],
        variants: [],
      },
    })
  } catch (error: any) {
    console.error('[API] Error updating product:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const admin = ensureSupabaseAdmin()
    const { error } = await admin
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('[API] Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error: any) {
    console.error('[API] Error deleting product:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: 500 }
    )
  }
}
