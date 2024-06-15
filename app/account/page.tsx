import { auth } from '@/lib/auth'

export default async function AccountPage() {
  const session = await auth()

  return (
    <h2 className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome, {session?.user?.name}
    </h2>
  )
}
