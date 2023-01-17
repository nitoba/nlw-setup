/* eslint-disable no-useless-constructor */
import { RegisterUserRequest } from '../dto/register-user-request'
import { AuthRepository } from '../repositories/auth-repository'

export class RegisterUser {
  constructor(private readonly repository: AuthRepository) {}

  async execute({ user, account }: RegisterUserRequest) {
    if (!user || !account) {
      throw new Error('User and account are required')
    }

    const createdUser = await this.repository.registerUser({ user, account })

    if (createdUser === null) throw new Error('User already registered')
  }
}
