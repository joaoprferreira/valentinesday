import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
})

interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  [key: string]: any
}

export async function uploadToCloudinary(
  filePath: string
): Promise<CloudinaryUploadResult> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'homenagens',
      resource_type: 'auto',
    })
    return result
  } catch (error) {
    console.error('Erro no upload para Cloudinary:', error)
    throw new Error('Falha no upload da imagem')
  }
}
