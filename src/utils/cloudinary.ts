import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
})

interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
}

export const uploadToCloudinary = (
  buffer: Buffer
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'homenagens' },
      (error, result) => {
        if (error) return reject(error)
        resolve(result as CloudinaryUploadResult)
      }
    )
    stream.end(buffer)
  })
}
