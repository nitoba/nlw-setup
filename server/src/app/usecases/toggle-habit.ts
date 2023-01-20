/* eslint-disable no-useless-constructor */
import { DayRepository } from '../repositories/day-repository'

export class ToggleHabit {
  constructor(private readonly dayRepository: DayRepository) {}

  async execute(id: string) {
    if (!id) throw new Error('id is required!')

    const today = new Date()

    let day = await this.dayRepository.getDayByDate(today)

    if (!day) {
      day = await this.dayRepository.createByDate(today)
    }

    const dayHabit = await this.dayRepository.getDayHabit(id, day.id)

    if (dayHabit) {
      await this.dayRepository.deleteHabitFromDay(id, day.id)
    } else {
      await this.dayRepository.addHabitToDay(id, day.id)
    }
  }
}
