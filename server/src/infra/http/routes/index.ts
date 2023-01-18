import { FastifyInstance } from 'fastify'
import { AuthRoutes } from './auth-routes'
import { HabitRoutes } from './habits-routes'

export function Router(app: FastifyInstance) {
  app.register(AuthRoutes, { prefix: '/auth' })
  app.register(HabitRoutes, { prefix: '/habits' })
}
