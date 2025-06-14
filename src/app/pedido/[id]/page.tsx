import { Metadata } from 'next'
import fs from 'fs/promises'
import Image from 'next/image'
import path from 'path'
import { Hearts } from '../../components/Hearts'
import { MusicButton } from '../../components/ButtonMusic'
import { CoupleHeader } from '../../components/coupleHeader'

interface Pedido {
  id: string
  nome: string
  mensagem: string
  imagem: string
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Homenagem ${id}`,
  }
}

export async function generateStaticParams() {
  const dbPath = path.join(process.cwd(), 'src/data/pedidos.json')
  try {
    const content = await fs.readFile(dbPath, 'utf-8')
    const pedidos: Pedido[] = JSON.parse(content)

    return pedidos.map((pedido) => ({
      id: pedido.id,
    }))
  } catch {
    return []
  }
}

export default async function PedidoPage({ params }: Props) {
  const { id } = await params
  const dbPath = path.join(process.cwd(), 'src/data/pedidos.json')
  let pedidos = []
  try {
    const content = await fs.readFile(dbPath, 'utf-8')
    pedidos = JSON.parse(content)
  } catch {
    pedidos = []
  }

  const pedido = pedidos.find((p: Pedido) => p.id === id)

  if (!pedido) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Homenagem não encontrada 😢</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-pink-100 flex items-center justify-center px-4">
      <Hearts />
      <div className="bg-white shadow-xl p-8 rounded-xl max-w-lg text-center animate-fade-in">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">
          💖 Homenagem para {pedido.nome} 💖
        </h1>
        <Image
          src={pedido.imagem}
          alt={pedido.nome}
          width={300}
          height={300}
          className="w-full max-w-xs mx-auto rounded-lg shadow mb-4"
        />
        <CoupleHeader coupleName="Jack & Rose" since="2023-01-01T15:00:00" />
        <p className="text-pink-700 text-lg mb-4 whitespace-pre-wrap">
          {pedido.mensagem}
        </p>
        <audio controls autoPlay loop className="mx-auto">
          <source src="/audio/musica_romantica.mp3" type="audio/mpeg" />
          Seu navegador não suporta áudio.
        </audio>
        <MusicButton />
        <p className="text-sm text-gray-500 mt-4">Feito com amor ❤️</p>
      </div>
    </main>
  )
}
