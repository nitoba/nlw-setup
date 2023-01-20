import dayjs from 'dayjs'
import { InMemoryDayRepository } from '../../test/repositories/in-memory-day-repository'
import { InMemoryHabitsRepository } from '../../test/repositories/in-memory-habits-repositories'
import { seed } from '../../test/seed-test'
import { ToggleHabit } from './toggle-habit'

const makeSut = () => {
  const habitRepository = new InMemoryHabitsRepository()
  const dayRepository = new InMemoryDayRepository()
  const sut = new ToggleHabit(dayRepository)

  return { sut, habitRepository, dayRepository }
}

describe('Toggle Habit Usecase', () => {
  it('should not be able to toggle a habit without id', async () => {
    const { sut } = makeSut()

    expect(sut.execute('')).rejects.toThrowError('id is required!')
  })

  it('should be able to toggle a habit to completed', async () => {
    const { days, habits } = seed()
    const { sut, dayRepository, habitRepository } = makeSut()
    dayRepository.days = days
    habitRepository.habits = habits

    const habitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'

    await sut.execute(habitId)

    const today = dayjs().startOf('day').toDate()

    const isCompletedHabit = dayRepository.days.find(
      (day) =>
        day.date.toString() === today.toString() &&
        day.habitIds.includes(habitId),
    )

    expect(isCompletedHabit).toBeTruthy()
  })

  it('should be able to toggle a habit uncompleted', async () => {
    const { days, habits } = seed()
    const { sut, dayRepository, habitRepository } = makeSut()
    dayRepository.days = days
    habitRepository.habits = habits

    const habitId = '00880d75-a933-4fef-94ab-e05744435297'

    // Toggle to completed
    await sut.execute(habitId)
    // Toggle to uncompleted
    await sut.execute(habitId)

    const today = dayjs().startOf('day').toDate()

    const isCompletedHabit = dayRepository.days.find(
      (day) =>
        day.date.toString() === today.toString() &&
        day.habitIds.includes(habitId),
    )

    expect(isCompletedHabit).toBeFalsy()
  })
})
