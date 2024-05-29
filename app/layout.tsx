import { type Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'

import '@/styles/global.css'

const josefinSans = Josefin_Sans({ subsets: ['latin'], display: 'swap' })

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
        className={`${josefinSans.className} min-h-screen bg-primary-950 text-primary-100`}
      >
        {children}
      </body>
    </html>
  )
}
