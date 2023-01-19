/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { GetDetailsDay } from '../../../app/usecases/get-details-day'
import { HabitPresenter } from '../presenter/habit-to-view'

export class DayController {
  constructor(private readonly getDetailsDay: GetDetailsDay) {}

  async getDetail(req: FastifyRequest, res: FastifyReply) {
    try {
      const getDayParams = z.object({
        date: z.coerce.date(),
      })

      const { date } = getDayParams.parse(req.query)

      const { possibleHabits, completedHabits } =
        await this.getDetailsDay.execute(date)

      return res.send({
        possibleHabits: possibleHabits.map(HabitPresenter.toJson),
        completedHabits,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({
          message: error.errors.at(0)?.message,
        })
      }

      return res.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
