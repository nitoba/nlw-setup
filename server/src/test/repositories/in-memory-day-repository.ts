import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { Day } from '../../app/entities/day'
import { DayRepository } from '../../app/repositories/day-repository'

export class InMemoryDayRepository implements DayRepository {
  days: Day[] = []
  async createByDate(date: Date): Promise<Day> {
    const parsedDate = dayjs(date).startOf('day').toDate()
    const id = randomUUID()

    this.days.push(new Day({ id, date: parsedDate, habitIds: [] }))

    return this.days.find((day) => day.id === id) as Day
  }

  async addHabitToDay(habitId: string, dayId: string): Promise<void> {
    const dayIndex = this.days.findIndex((day) => day.id === dayId)

    this.days[dayIndex].habitIds.push(habitId)
  }

  async deleteHabitFromDay(habitId: string, dayId: string): Promise<void> {
    const dayIndex = this.days.findIndex((day) => day.id === dayId)

    const habitIdsIndex = this.days[dayIndex].habitIds.indexOf(habitId)

    this.days[dayIndex].habitIds.splice(habitIdsIndex, 1)
  }

  async getDayHabit(habitId: string, dayId: string): Promise<Day | undefined> {
    return this.days.find(
      (day) => day.id === dayId && day.habitIds.some((id) => id === habitId),
    )
  }

  async getDayByDate(date: Date): Promise<Day | undefined> {
    const parsedDate = dayjs(date).startOf('day').toDate()
    return this.days.find(
      (day) => day.date.toString() === parsedDate.toString(),
    )
  }
}
