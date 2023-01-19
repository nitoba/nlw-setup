import { CreateHabitRequest } from '../dto/create-habit-request'
import { Habit } from '../entities/habit'

export abstract class HabitRepository {
  abstract getAllHabits(): Promise<Habit[]>
  abstract createHabit(data: CreateHabitRequest): Promise<Habit | undefined>
  abstract possibleHabits(date: Date): Promise<Habit[]>
}
