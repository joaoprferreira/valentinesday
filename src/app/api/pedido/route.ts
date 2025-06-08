import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { uploadToCloudinary } from '@/utils/cloudinary'
import { gerarQRCode } from '@/utils/gerarQRCode'
import path from 'path'
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const nome = formData.get('nome') as string
    const mensagem = formData.get('mensagem') as string
    const imagem = formData.get('imagem') as File

    const arrayBuffer = await imagem.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const cloudinaryUpload = await uploadToCloudinary(buffer)

    const id = uuidv4()
    const pedido = {
      id,
      nome,
      mensagem,
      imagem: cloudinaryUpload.secure_url,
    }

    const dbPath = path.join(process.cwd(), 'src/data/pedidos.json')

    // Garante que o arquivo existe, se não existir cria com um array vazio
    try {
      await fs.access(dbPath)
    } catch {
      await fs.mkdir(path.dirname(dbPath), { recursive: true })
      await fs.writeFile(dbPath, '[]')
    }

    const content = await fs.readFile(dbPath, 'utf-8')
    const pedidos = JSON.parse(content)

    pedidos.push(pedido)
    await fs.writeFile(dbPath, JSON.stringify(pedidos, null, 2))

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    const url = `${baseUrl}/pedido/${id}`
    const qrCode = await gerarQRCode(url)

    return NextResponse.json({
      id,
      url,
      qrCode,
      qrPageUrl: `${baseUrl}/qr/${id}`,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
