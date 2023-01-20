/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { CreateHabit } from '../../../app/usecases/create-habit'
import { GetAllHabits } from '../../../app/usecases/get-all-habits'
import { ToggleHabit } from '../../../app/usecases/toggle-habit'
import { HabitPresenter } from '../presenter/habit-to-view'

export class HabitController {
  constructor(
    private readonly getAllHabits: GetAllHabits,
    private readonly createHabit: CreateHabit,
    private readonly toggleHabit: ToggleHabit,
  ) {}

  async getAll(req: FastifyRequest, res: FastifyReply) {
    const rawHabits = await this.getAllHabits.execute()

    return res.send(rawHabits.map(HabitPresenter.toJson))
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
        return res.status(201).send(HabitPresenter.toJson(habit))
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .send({ message: error.errors.map((zodError) => zodError.message) })
      }

      return res.status(500).send({ message: 'Internal Server Error' })
    }
  }

  async toggle(req: FastifyRequest, res: FastifyReply) {
    const toggleHabitParams = z.object({
      id: z.string().uuid({ message: 'Invalid habit id!' }),
    })

    try {
      const { id } = toggleHabitParams.parse(req.params)
      await this.toggleHabit.execute(id)

      return res.send()
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
