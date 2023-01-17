/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUser } from '../../../app/usecases/register-user'

export class AuthController {
  constructor(private readonly registerUser: RegisterUser) {}

  async register(req: FastifyRequest, res: FastifyReply) {
    try {
      const { user, account } = req.body as any

      console.log(user, account)

      await this.registerUser.execute({ user, account })

      return res.status(201).send()
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message)
      } else {
        return res.status(500).send({ message: 'Internal Server Error' })
      }
    }
  }
}
