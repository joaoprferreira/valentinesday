import { Metadata } from 'next'
import fs from 'fs/promises'
import Image from 'next/image'
import path from 'path'

interface Pedido {
  id: string
  nome: string
  mensagem: string
  imagem: string
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  return {
    title: `Homenagem ${params.id}`,
  }
}

export default async function PedidoPage({
  params,
}: {
  params: { id: string }
}) {
  const dbPath = path.join(process.cwd(), 'src/data/pedidos.json')
  let pedidos = []
  try {
    const content = await fs.readFile(dbPath, 'utf-8')
    pedidos = JSON.parse(content)
  } catch {
    pedidos = []
  }

  const pedido = pedidos.find((p: Pedido) => p.id === params.id)

  if (!pedido) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Homenagem não encontrada 😢</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-pink-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl p-8 rounded-xl max-w-lg text-center animate-fade-in">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">
          💖 Homenagem para {pedido.nome} 💖
        </h1>
        <Image
          src={pedido.imagem}
          alt={pedido.nome}
          className="w-full max-w-xs mx-auto rounded-lg shadow mb-4"
        />
        <p className="text-pink-700 text-lg mb-4 whitespace-pre-wrap">
          {pedido.mensagem}
        </p>
        <audio controls autoPlay loop className="mx-auto">
          <source src="/audio/musica_romantica.mp3" type="audio/mpeg" />
          Seu navegador não suporta áudio.
        </audio>
        <p className="text-sm text-gray-500 mt-4">Feito com amor ❤️</p>
      </div>
    </main>
  )
}
