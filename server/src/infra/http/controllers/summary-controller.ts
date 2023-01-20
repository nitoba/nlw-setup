/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { GetSummary } from '../../../app/usecases/get-summary'
import { SummaryDayPresenter } from '../presenter/summary-to-view'

export class SummaryController {
  constructor(private readonly getSummary: GetSummary) {}

  async get(req: FastifyRequest, res: FastifyReply) {
    try {
      const summary = await this.getSummary.execute()

      return res.send(summary.map(SummaryDayPresenter.toJson))
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
