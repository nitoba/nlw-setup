import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { CreateHabitRequest } from '../../app/dto/create-habit-request'
import { Habit } from '../../app/entities/habit'
import { HabitRepository } from '../../app/repositories/habit-repository'

export class InMemoryHabitsRepository implements HabitRepository {
  habits: Habit[] = []

  async createHabit(data: CreateHabitRequest): Promise<Habit | undefined> {
    const id = randomUUID()

    const today = dayjs().startOf('day').toDate()

    this.habits.push(new Habit({ id, title: data.title, created_at: today }))

    return this.habits.find((habit) => habit.id === id)
  }

  async getAllHabits(): Promise<Habit[]> {
    return this.habits
  }
}
