import { IncomingMessage, OutgoingMessage } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { setCookie } from 'nookies'

const SCOPES = {
  EMAIL_SCOPE: 'https://www.googleapis.com/auth/userinfo.email',
  PROFILE_SCOPE: 'https://www.googleapis.com/auth/userinfo.profile',
}

export function buildNextAuthOptions(
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | OutgoingMessage,
): AuthOptions {
  return {
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
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
            {
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
            },
          )

          const data = await response.json()

          setCookie({ res }, '@habits_tracker:access_token', data.accessToken, {
            maxAge: 60 * 60 * 24 * 15, // 15 days
            path: '/',
          })

          return response.status === 201
        }
        return false
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res))
}
