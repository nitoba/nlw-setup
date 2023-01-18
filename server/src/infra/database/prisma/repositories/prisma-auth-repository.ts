import { RegisterUserRequest } from '../../../../app/dto/register-user-request'
import { User } from '../../../../app/entities/user'
import { AuthRepository } from '../../../../app/repositories/auth-repository'
import { prisma } from '../../../../lib/prisma'
import { PrismaUserToEntity } from '../../../adapter/prisma-user-to-entity'

export class PrismaAuthRepository implements AuthRepository {
  async registerUser({
    user,
    account,
  }: RegisterUserRequest): Promise<User | null> {
    const alreadyExistsUser = await prisma.user.findUnique({
      where: { email: user.email },
    })

    if (alreadyExistsUser) return null

    const prismaUser = await prisma.user.create({
      data: {
        email: user.email,
        avatar_url: user.avatar_url,
        name: user.name,
        accounts: {
          create: [
            {
              provider: account.provider,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
            },
          ],
        },
      },
    })

    return PrismaUserToEntity.toEntity(prismaUser)
  }
}
