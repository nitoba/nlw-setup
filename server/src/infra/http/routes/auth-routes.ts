import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { authDependencies } from '../../factories/container'

const { authController } = authDependencies()

export const AuthRoutes = async (
  app: FastifyInstance,
  ops: FastifyPluginOptions,
) => {
  app.post('/register', (req, res) => authController.register(req, res))
}
