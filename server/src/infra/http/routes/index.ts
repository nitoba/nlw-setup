import { FastifyInstance } from 'fastify'
import { AuthRoutes } from './auth-routes'
import { HabitRoutes } from './habits-routes'
import { DayRoutes } from './day-routes'

export function Router(app: FastifyInstance) {
  app.register(AuthRoutes, { prefix: '/auth' })
  app.register(HabitRoutes, { prefix: '/habits' })
  app.register(DayRoutes, { prefix: '/day' })
}
