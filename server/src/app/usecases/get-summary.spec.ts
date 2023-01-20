import { any, date } from 'zod'
import { InMemorySummaryRepository } from '../../test/repositories/in-memory-summary-repository'
import { seed } from '../../test/seed-test'
import { GetSummary } from './get-summary'

const makeSut = () => {
  const repository = new InMemorySummaryRepository()
  const sut = new GetSummary(repository)

  return { sut, repository }
}

describe('Get Summary Usecase', () => {
  it('should be able to toggle a habit to completed', async () => {
    const { days, habits } = seed()
    const { sut, repository } = makeSut()
    repository.days = days
    repository.habits = habits

    const response = await sut.execute()
    expect(response).toHaveLength(3)
  })
})
