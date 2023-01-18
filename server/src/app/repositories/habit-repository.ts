import { CreateHabitRequest } from '../dto/create-habit-request'
import { Habit } from '../entities/habit'

export interface HabitRepository {
  getAllHabits(): Promise<Habit[]>
  createHabit(data: CreateHabitRequest): Promise<Habit | undefined>
}
