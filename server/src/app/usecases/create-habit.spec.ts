import dayjs from 'dayjs'
import { InMemoryHabitsRepository } from '../../test/repositories/in-memory-habits-repositories'
import { CreateHabit } from './create-habit'

const makeSut = () => {
  const repository = new InMemoryHabitsRepository()
  const sut = new CreateHabit(repository)

  return { sut, repository }
}

describe('Create Habit Usecase', () => {
  it('should be able to create a new habit', async () => {
    const { sut } = makeSut()

    const habit = await sut.execute({
      title: 'Beber 2L de água',
      weekDays: [0, 1, 2, 3, 4, 5, 6],
    })

    const today = dayjs().startOf('day').toDate()

    expect(habit?.title).toEqual('Beber 2L de água')
    expect(habit?.createdAt).toEqual(today)
  })

  it('should not be able to create a new habit without any week days', async () => {
    const { sut } = makeSut()

    expect(
      sut.execute({
        title: 'Beber 2L de água',
        weekDays: [],
      }),
    ).rejects.toThrowError('Week days cannot be empty')
  })
})
