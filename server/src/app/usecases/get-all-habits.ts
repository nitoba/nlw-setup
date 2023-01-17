/* eslint-disable no-useless-constructor */
import { HabitRepository } from '../repositories/habit-repository'

export class GetAllHabits {
  constructor(private readonly repository: HabitRepository) {}

  execute() {
    return this.repository.getAllHabits()
  }
}
