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

  async possibleHabits(date: Date): Promise<Habit[]> {
    const parsedDate = dayjs(date).startOf('day')
    const weekDay = dayjs(parsedDate).get('day')

    const possibleHabits = this.habits.filter((habit) => {
      if (
        habit.createdAt! <= date &&
        habit.weekDays?.some((habitWeekDay) => habitWeekDay === weekDay)
      ) {
        return habit
      } else {
        return undefined
      }
    })

    return possibleHabits
  }

  async getAllHabits(): Promise<Habit[]> {
    return this.habits
  }

  toggleHabit(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
