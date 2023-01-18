/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateHabit } from '../../../app/usecases/create-habit'
import { GetAllHabits } from '../../../app/usecases/get-all-habits'
import { HabitPresenter } from '../presenter/habit-to-view'

export class HabitController {
  constructor(
    private readonly getAllHabits: GetAllHabits,
    private readonly createHabit: CreateHabit,
  ) {}

  async getAll(req: FastifyRequest, res: FastifyReply) {
    const rawHabits = await this.getAllHabits.execute()

    return res.send(rawHabits.map(HabitPresenter.toView))
  }

  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const createHabitBody = z.object({
        title: z.string(),
        weekDays: z.array(z.number().min(0).max(6)),
      })

      const body = createHabitBody.parse(req.body)

      const token = await req.jwtVerify<{ sub: string }>()

      const habit = await this.createHabit.execute({
        ...body,
        userId: token.sub,
      })

      if (habit) {
        return res.status(201).send(HabitPresenter.toView(habit))
      }
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
}
