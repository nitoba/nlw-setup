import { Habit } from '../../app/entities/habit'
import { HabitRepository } from '../../app/repositories/habit-repository'

export class InMemoryHabitsRepository implements HabitRepository {
  habits: Habit[] = []

  async getAllHabits(): Promise<Habit[]> {
    return this.habits
  }
}
