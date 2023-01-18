import dayjs from 'dayjs'
import { CreateHabitRequest } from '../../../../app/dto/create-habit-request'
import { Habit } from '../../../../app/entities/habit'
import { HabitRepository } from '../../../../app/repositories/habit-repository'
import { prisma } from '../../../../lib/prisma'
import { PrismaHabitToEntity } from '../../../adapter/prisma-habit-to-entity'

export class PrismaHabitsRepository implements HabitRepository {
  async createHabit({
    title,
    weekDays,
    userId,
  }: CreateHabitRequest): Promise<Habit | undefined> {
    const today = dayjs().startOf('day').toDate()
    const habit = await prisma.habit.create({
      data: {
        title,
        created_at: today,
        User: {
          connect: {
            id: userId,
          },
        },
        WeekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            }
          }),
        },
      },
    })

    return PrismaHabitToEntity.toEntity(habit)
  }

  async getAllHabits(): Promise<Habit[]> {
    const prismaHabits = await prisma.habit.findMany()

    return prismaHabits.map(PrismaHabitToEntity.toEntity)
  }
}
