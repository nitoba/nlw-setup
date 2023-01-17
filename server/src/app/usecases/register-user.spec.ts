import { randomUUID } from 'crypto'
import { InMemoryAuthRepository } from '../../test/repositories/in-memory-auth-repository'
import { RegisterUser } from './register-user'

const makeSut = () => {
  const repository = new InMemoryAuthRepository()
  const sut = new RegisterUser(repository)

  return { sut, repository }
}

describe('Register User Usecase', () => {
  it('should register a user with google account', async () => {
    const { sut, repository } = makeSut()

    await sut.execute({
      user: {
        email: 'example@email.com',
        avatar_url: 'https://github.com/nitoba.png',
        name: 'Bruno Alves',
      },
      account: {
        provider: 'google',
        access_token: randomUUID(),
        refresh_token: randomUUID(),
      },
    })

    expect(repository.accounts).toHaveLength(1)
    expect(repository.users).toHaveLength(1)
    expect(repository.users[0].id).toBe(repository.accounts[0].user_id)
  })

  it('should not be able to register a user if already registered with the same email to the same provider', async () => {
    const { sut } = makeSut()

    await sut.execute({
      user: {
        email: 'example@email.com',
        avatar_url: 'https://github.com/nitoba.png',
        name: 'Bruno Alves',
      },
      account: {
        provider: 'google',
        access_token: randomUUID(),
        refresh_token: randomUUID(),
      },
    })

    expect(
      sut.execute({
        user: {
          email: 'example@email.com',
          avatar_url: 'https://github.com/nitoba.png',
          name: 'Bruno Alves',
        },
        account: {
          provider: 'google',
          access_token: randomUUID(),
          refresh_token: randomUUID(),
        },
      }),
    ).rejects.toThrow('User already registered')
  })
})
