import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { dayDependencies } from '../../factories/container'

const { dayController } = dayDependencies()

export const DayRoutes = async (
  app: FastifyInstance,
  ops: FastifyPluginOptions,
) => {
  app.get('/', (req, res) => dayController.getDetail(req, res))
}
