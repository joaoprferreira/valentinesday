'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [qrPageUrl, setQrPageUrl] = useState('') // Mudei para qrPageUrl ao invés de qrCodeUrl
  const [loading, setLoading] = useState(false)
  const [imagemPreview, setImagemPreview] = useState<string | null>(null)

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagemPreview(URL.createObjectURL(file))
    } else {
      setImagemPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget as HTMLFormElement)

    try {
      const res = await fetch('/api/pedido', {
        method: 'POST',
        body: form,
      })

      if (!res.ok) throw new Error('Erro ao gerar QR Code')

      const data = await res.json()
      setQrPageUrl(data.qrPageUrl) // Agora esperamos qrPageUrl da API
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
      alert('Ocorreu um erro ao gerar o QR Code')
    }
  }

  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg p-8 rounded-xl max-w-md w-full">
        <h1 className="text-2xl font-semibold text-pink-600 mb-6 text-center">
          💌 Criar Homenagem
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="nome"
            placeholder="Nome da pessoa"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-pink-400 placeholder-pink-300 text-pink-900"
            required
          />
          <textarea
            name="mensagem"
            placeholder="Mensagem de homenagem"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-pink-400 placeholder-pink-300 text-pink-900 min-h-[100px]"
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-pink-700 text-sm">Imagem:</label>
            <input
              type="file"
              name="imagem"
              accept="image/*"
              className="border border-gray-300 rounded-md px-4 py-2 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
              required
              onChange={handleImagemChange}
            />
          </div>

          {imagemPreview && (
            <div className="flex justify-center">
              <Image
                src={imagemPreview}
                alt="Preview da imagem"
                className="w-32 h-32 object-cover rounded mx-auto border-2 border-pink-200"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white rounded-md py-2 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Gerando...
              </span>
            ) : (
              'Gerar QR Code'
            )}
          </button>
        </form>

        {qrPageUrl && (
          <div className="mt-6 text-center animate-fade-in">
            <h2 className="text-lg font-semibold text-pink-600 mb-2">
              QR Code Gerado!
            </h2>
            <p className="text-sm text-pink-500 mb-4">
              Envie este link ou a página do QR Code para a pessoa:
            </p>
            <div className="bg-pink-50 p-3 rounded-md break-all">
              <a
                href={qrPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-700 hover:text-pink-900 underline"
              >
                {qrPageUrl}
              </a>
            </div>
            <a
              href={qrPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-pink-100 text-pink-700 px-4 py-2 rounded-md hover:bg-pink-200 transition"
            >
              Abrir Página do QR Code
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
