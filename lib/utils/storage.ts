import { supabaseAdmin } from '@/lib/supabase'

const BUCKET_NAME = 'product-images'

export async function uploadProductImage(file: File): Promise<string> {
  try {
    const fileName = `${Date.now()}-${file.name}`
    const filePath = `products/${fileName}`

    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      throw new Error(error.message)
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath)

    return urlData.publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export async function deleteProductImage(imagePath: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove([imagePath])

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}

export function getPublicImageUrl(filePath: string): string {
  if (!filePath) return ''
  if (filePath.startsWith('http')) return filePath
  
  return supabaseAdmin.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath).data.publicUrl
}
