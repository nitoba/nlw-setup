import { randomUUID } from 'crypto'
import { RegisterUserRequest } from '../../app/dto/register-user-request'
import { Account } from '../../app/entities/account'
import { User } from '../../app/entities/user'
import { AuthRepository } from '../../app/repositories/auth-repository'

export class InMemoryAuthRepository implements AuthRepository {
  users: User[] = []
  accounts: Account[] = []
  async registerUser({
    user,
    account,
  }: RegisterUserRequest): Promise<void | null> {
    const userAlreadyRegistered = this.users.findIndex(
      (userInArray) => userInArray.email === user.email,
    )

    if (userAlreadyRegistered !== -1) return null

    this.users.push(
      new User({
        id: randomUUID(),
        email: user.email,
        name: user.name ?? '',
        avatar_url: user.avatar_url,
      }),
    )

    const userOnDatabase = this.users[0]

    this.accounts.push(
      new Account({
        id: randomUUID(),
        user_id: userOnDatabase.id,
        provider: account.provider,
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at,
      }),
    )
  }
}
