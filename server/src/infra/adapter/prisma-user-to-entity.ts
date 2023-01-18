import { User as PrismaUser } from '@prisma/client'
import { User } from '../../app/entities/user'

export class PrismaUserToEntity {
  static toEntity(prismaUser: PrismaUser) {
    return new User({
      id: prismaUser.id,
      email: prismaUser.email!,
      name: prismaUser.name!,
      avatar_url: prismaUser.avatar_url!,
      created_at: prismaUser.created_at,
      updated_at: prismaUser.updated_at,
    })
  }
}
