import { Day } from '../../app/entities/day'
import { Habit } from '../../app/entities/habit'
import { SummaryDay } from '../../app/entities/summary-day'
import { SummaryRepository } from '../../app/repositories/summary-repository'

export class InMemorySummaryRepository implements SummaryRepository {
  days: Day[] = []
  habits: Habit[] = []
  async getSummary(): Promise<SummaryDay[]> {
    return this.days.map((day) => {
      const possibleHabits = this.habits.filter((habit) => {
        return (
          habit.weekDays?.includes(day.date.getDay()) &&
          habit.createdAt! <= day.date
        )
      })

      return new SummaryDay({
        id: day.id,
        date: day.date,
        completed: day.habitIds.length,
        amount: possibleHabits.length,
      })
    })
  }
}
