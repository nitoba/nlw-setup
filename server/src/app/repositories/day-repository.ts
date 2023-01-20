import { Day } from '../entities/day'

export abstract class DayRepository {
  abstract getDayByDate(date: Date): Promise<Day | undefined>
  abstract createByDate(date: Date): Promise<Day>
  abstract addHabitToDay(habitId: string, dayId: string): Promise<void>
  abstract deleteHabitFromDay(habitId: string, dayId: string): Promise<void>
  abstract getDayHabit(habitId: string, dayId: string): Promise<Day | undefined>
}
