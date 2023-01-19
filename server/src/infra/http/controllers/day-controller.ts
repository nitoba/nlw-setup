/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { GetDetailsDay } from '../../../app/usecases/get-details-day'

export class DayController {
  constructor(private readonly getDetailsDay: GetDetailsDay) {}

  getDetail(req: FastifyRequest, res: FastifyReply) {
    const getDayParams = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDayParams.parse(req.query)
  }
}
