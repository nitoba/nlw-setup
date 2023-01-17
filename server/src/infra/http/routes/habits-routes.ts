import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { habitDependencies } from '../../factories/container'

const { habitController } = habitDependencies()

export const HabitRoutes = async (
  app: FastifyInstance,
  ops: FastifyPluginOptions,
) => {
  app.get('/all', (req, res) => habitController.getAll(req, res))
}
