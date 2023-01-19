import { Day } from '../entities/day'

export abstract class DayRepository {
  abstract getDayByDate(date: Date): Promise<Day | undefined>
}
