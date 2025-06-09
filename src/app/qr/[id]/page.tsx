import { gerarQRCode } from '@/utils/gerarQRCode'
import fs from 'fs'
import Image from 'next/image'
import path from 'path'

interface Pedido {
  id: string
  nome: string
  mensagem: string
  imagem: string
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function QRPage({ params }: Props) {
  const dbPath = path.join(process.cwd(), 'src/data/pedidos.json')
  const pedidos = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
  const { id } = await params

  const pedido = pedidos.find((p: Pedido) => p.id === id)

  if (!pedido) return <p>QR Code não encontrado</p>

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/pedido/${id}`
  const qrCode = await gerarQRCode(url)

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-xl font-semibold mb-4">Escaneie este QR Code</h1>
        <Image
          src={qrCode}
          width={300}
          height={300}
          alt="QR Code"
          className="w-64 h-64 mx-auto mb-4"
        />
        <p className="text-gray-600">
          Ele levará você para uma surpresa especial ❤️
        </p>
        <a
          href={qrCode}
          download={`homenagem-${pedido.nome}.png`}
          className="mt-4 inline-block bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
        >
          Baixar QR Code
        </a>
        <div className="mt-6">
          <p className="text-gray-500 mb-2">Não conseguiu escanear?</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-md hover:bg-pink-200 transition"
          >
            Acessar homenagem diretamente
          </a>
        </div>
      </div>
    </main>
  )
}
