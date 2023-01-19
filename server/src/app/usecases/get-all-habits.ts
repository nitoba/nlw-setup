/* eslint-disable no-useless-constructor */
import { HabitRepository } from '../repositories/habit-repository'

export class GetAllHabits {
  constructor(private readonly repository: HabitRepository) {}

  async execute() {
    const habits = await this.repository.getAllHabits()

    return habits
  }
}
