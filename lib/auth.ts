import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import getGuest from '@/services/guests/getGuests'
import createGuest from '@/services/guests/createGuest'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email ?? '')

        if (!existingGuest) {
          await createGuest({
            fullName: user.name as string,
            email: user.email as string,
          })
        }

        return true
      } catch {
        return false
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email)

      session.user.guestId = guest.id // FIXME: 类型问题

      return session
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
})
