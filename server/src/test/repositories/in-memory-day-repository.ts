import { Day } from '../../app/entities/day'
import { DayRepository } from '../../app/repositories/day-repository'

export class InMemoryDayRepository implements DayRepository {
  days: Day[] = []
  async getDayByDate(date: Date): Promise<Day | undefined> {
    return this.days.find((day) => day.date.toString() === date.toString())
  }
}
