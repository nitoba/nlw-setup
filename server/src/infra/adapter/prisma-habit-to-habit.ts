import { Habit as PrismaHabit } from '@prisma/client'
import { Habit } from '../../app/entities/habit'

export class PrismaHabitToEntity {
  static toEntity(prismaHabit: PrismaHabit) {
    return new Habit({
      id: prismaHabit.id,
      title: prismaHabit.title,
      created_at: prismaHabit.created_at,
    })
  }
}
