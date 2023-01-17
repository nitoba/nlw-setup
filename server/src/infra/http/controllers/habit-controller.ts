/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { GetAllHabits } from '../../../app/usecases/get-all-habits'

export class HabitController {
  constructor(private readonly getAllHabits: GetAllHabits) {}

  async getAll(req: FastifyRequest, res: FastifyReply) {
    const habits = await this.getAllHabits.execute()

    return res.send(habits)
  }
}
