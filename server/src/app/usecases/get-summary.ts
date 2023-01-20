/* eslint-disable no-useless-constructor */
import { SummaryRepository } from '../repositories/summary-repository'

export class GetSummary {
  constructor(private readonly repository: SummaryRepository) {}
  async execute() {
    return await this.repository.getSummary()
  }
}
