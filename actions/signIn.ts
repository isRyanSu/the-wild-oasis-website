'use server'

import { signIn } from '@/lib/auth'

export default async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}
