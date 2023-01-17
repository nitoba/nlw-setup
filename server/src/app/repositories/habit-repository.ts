import { Habit } from '../entities/habit'

export interface HabitRepository {
  getAllHabits(): Promise<Habit[]>
}
