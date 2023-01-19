/* eslint-disable no-useless-constructor */
import { DayRepository } from '../repositories/day-repository'
import { HabitRepository } from '../repositories/habit-repository'

export class GetDetailsDay {
  constructor(
    private readonly habitRepository: HabitRepository,
    private readonly dayRepository: DayRepository,
  ) {}

  async execute(date: Date) {
    // All habits in this day
    const possibleHabits = await this.habitRepository.possibleHabits(date)

    // All habits that has completed
    const day = await this.dayRepository.getDayByDate(date)

    const completedHabits = day?.habitIds

    return {
      possibleHabits,
      completedHabits,
    }
  }
}
