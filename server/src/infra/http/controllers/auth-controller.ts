/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUser } from '../../../app/usecases/register-user'

export class AuthController {
  constructor(private readonly registerUser: RegisterUser) {}

  async register(req: FastifyRequest, res: FastifyReply) {
    try {
      const { user, account } = req.body as any

      const userCreated = await this.registerUser.execute({ user, account })

      const accessToken = await res.jwtSign({
        sub: userCreated.id,
        email: userCreated.email,
      })

      return res.status(201).send({ accessToken })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message)
      } else {
        return res.status(500).send({ message: 'Internal Server Error' })
      }
    }
  }
}
