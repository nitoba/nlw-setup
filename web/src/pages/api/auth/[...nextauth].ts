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
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)
