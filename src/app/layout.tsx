import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Homenagem 💖',
  description: 'Uma homenagem especial feita com amor!',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt-br">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
