import { Day } from '../../../../app/entities/day'
import { DayRepository } from '../../../../app/repositories/day-repository'
import { prisma } from '../../../../lib/prisma'
import { PrismaDayToEntity } from '../../../adapter/prisma-day-to-day'

export class PrismaDayRepository implements DayRepository {
  async getDayByDate(date: Date): Promise<Day | undefined> {
    const day = await prisma.day.findUnique({
      where: { date },
      include: { DayHabits: true },
    })

    if (!day) return undefined

    return PrismaDayToEntity.toEntity(day)
  }
}
