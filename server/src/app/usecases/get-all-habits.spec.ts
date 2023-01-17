import { randomUUID } from 'crypto'
import { InMemoryHabitsRepository } from '../../test/repositories/in-memory-habits-repositories'
import { Habit } from '../entities/habit'
import { GetAllHabits } from './get-all-habits'

describe('Habits Usecase', () => {
  it('should be return a list of habits', async () => {
    const mockHabits = [
      new Habit({
        id: randomUUID(),
        title: 'Beber 3L de água por dia',
      }),
      new Habit({
        id: randomUUID(),
        title: 'Estudar NodeJS',
      }),
      new Habit({
        id: randomUUID(),
        title: 'Aprender Rust',
      }),
    ]

    const repository = new InMemoryHabitsRepository()

    repository.habits = mockHabits

    const usecase = new GetAllHabits(repository)

    const habits = await usecase.execute()

    expect(habits).toHaveLength(3)
  })

  it('should be return a list of habits empty if not have any habit', async () => {
    const repository = new InMemoryHabitsRepository()

    const usecase = new GetAllHabits(repository)

    const habits = await usecase.execute()

    expect(habits).toHaveLength(0)
  })
})
