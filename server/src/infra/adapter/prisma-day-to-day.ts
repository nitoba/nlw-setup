import { Day as PrismaDay, DayHabit } from '@prisma/client'
import { Day } from '../../app/entities/day'

export class PrismaDayToEntity {
  static toEntity(
    prismaDay: PrismaDay & {
      DayHabits: DayHabit[]
    },
  ) {
    return new Day({
      id: prismaDay.id,
      date: prismaDay.date,
      habitIds: prismaDay.DayHabits.map((dayHabit) => dayHabit.habit_id),
    })
  }
}
