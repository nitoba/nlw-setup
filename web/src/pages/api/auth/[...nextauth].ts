import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const SCOPES = {
  EMAIL_SCOPE: 'https://www.googleapis.com/auth/userinfo.email',
  PROFILE_SCOPE: 'https://www.googleapis.com/auth/userinfo.profile',
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRECT,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: { scope: Object.values(SCOPES).join(' ') },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (user) {
        const response = await fetch(`${process.env.BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              name: user.name,
              email: user.email,
              avatar_url: user.image,
            },
            account: {
              provider: account?.provider,
              access_token: account?.access_token,
              refresh_token: account?.refresh_token,
              expires_at: account?.expires_at,
            },
          }),
        })

        return response.status === 201
      }
      return false
    },
  },
}
export default NextAuth(authOptions)
