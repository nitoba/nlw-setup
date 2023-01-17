import { Habit } from '../../../../app/entities/habit'
import { HabitRepository } from '../../../../app/repositories/habit-repository'
import { prisma } from '../../../../lib/prisma'
import { PrismaHabitToEntity } from '../../../adapter/prisma-habit-to-entity'

export class PrismaHabitsRepository implements HabitRepository {
  async getAllHabits(): Promise<Habit[]> {
    const prismaHabits = await prisma.habit.findMany()

    return prismaHabits.map(PrismaHabitToEntity.toEntity)
  }
}
