/* eslint-disable no-useless-constructor */
import { CreateHabitRequest } from '../dto/create-habit-request'
import { HabitRepository } from '../repositories/habit-repository'

export class CreateHabit {
  constructor(private readonly repository: HabitRepository) {}
  async execute(habitRequest: CreateHabitRequest) {
    if (habitRequest.weekDays.length === 0) {
      throw new Error('Week days cannot be empty')
    }

    const habit = await this.repository.createHabit(habitRequest)

    return habit
  }
}
