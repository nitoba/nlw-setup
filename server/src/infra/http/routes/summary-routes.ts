import { FastifyInstance } from 'fastify'
import { summaryDayDependencies } from '../../factories/container'

const { summaryController } = summaryDayDependencies()

export const SummaryRoutes = async (app: FastifyInstance) => {
  app.get('/', (req, res) => summaryController.get(req, res))
}
