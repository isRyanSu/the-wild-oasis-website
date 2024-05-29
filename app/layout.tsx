import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Wild Oasis',
  description: 'The official website of The Wild Oasis',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-primary-950 text-primary-100`}
      >
        {children}
      </body>
    </html>
  )
}
