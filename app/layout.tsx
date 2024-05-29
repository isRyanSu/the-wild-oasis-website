import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Welcome · The Wild Oasis',
    template: '%s · The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.',
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
