import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { habitDependencies } from '../../factories/container'

const { habitController } = habitDependencies()

export const HabitRoutes = async (
  app: FastifyInstance,
  ops: FastifyPluginOptions,
) => {
  app.get('/', (req, res) => habitController.getAll(req, res))
  app.post('/', (req, res) => habitController.create(req, res))
  app.patch('/:id/toggle', (req, res) => habitController.toggle(req, res))
}
