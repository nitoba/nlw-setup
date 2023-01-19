import { InMemoryDayRepository } from '../../test/repositories/in-memory-day-repository'
import { InMemoryHabitsRepository } from '../../test/repositories/in-memory-habits-repositories'
import { seed } from '../../test/seed-test'
import { GetDetailsDay } from './get-details-day'

const makeSut = () => {
  const habitRepository = new InMemoryHabitsRepository()
  const dayRepository = new InMemoryDayRepository()
  const sut = new GetDetailsDay(habitRepository, dayRepository)

  return { sut, habitRepository, dayRepository }
}

describe('Get Day Details Usecase', () => {
  it('should return a list of habits within a date passed', async () => {
    const { days, habits } = seed()
    const { sut, dayRepository, habitRepository } = makeSut()
    dayRepository.days = days
    habitRepository.habits = habits

    const day = new Date('2023-01-02T03:00:00.000z')

    const { completedHabits, possibleHabits } = await sut.execute(day)

    expect(possibleHabits).toHaveLength(1)
    expect(completedHabits).toHaveLength(1)
  })
})
