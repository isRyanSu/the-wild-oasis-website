import { type Metadata } from 'next'

import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Not found · The Wild Oasis',
}

export default function NotFound() {
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
      >
        Go back home
      </Link>
    </main>
  )
}
