import { RegisterUserRequest } from '../../../../app/dto/register-user-request'
import { AuthRepository } from '../../../../app/repositories/auth-repository'
import { prisma } from '../../../../lib/prisma'

export class PrismaAuthRepository implements AuthRepository {
  async registerUser({
    user,
    account,
  }: RegisterUserRequest): Promise<void | null> {
    const alreadyExistsUser = await prisma.user.findUnique({
      where: { email: user.email },
    })

    if (alreadyExistsUser) return null

    const prismaUser = await prisma.user.create({
      data: { email: user.email, avatar_url: user.avatar_url, name: user.name },
    })

    await prisma.account.create({
      data: {
        provider: account.provider,
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at,
        user_id: prismaUser.id,
      },
    })
  }
}
