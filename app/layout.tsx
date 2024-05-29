import { type Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'

import Header from '@/components/Header'
import Main from '@/components/Main'

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
        className={`${josefinSans.className} flex min-h-screen flex-col bg-primary-950 text-primary-100`}
      >
        <Header />
        <Main>{children}</Main>
      </body>
    </html>
  )
}
