import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cabins',
}

export default function CabinsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
