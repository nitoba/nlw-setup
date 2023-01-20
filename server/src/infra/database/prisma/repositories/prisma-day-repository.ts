import dayjs from 'dayjs'
import { Day } from '../../../../app/entities/day'
import { DayRepository } from '../../../../app/repositories/day-repository'
import { prisma } from '../../../../lib/prisma'
import { PrismaDayToEntity } from '../../../adapter/prisma-day-to-day'

export class PrismaDayRepository implements DayRepository {
  async addHabitToDay(habitId: string, dayId: string): Promise<void> {
    await prisma.dayHabit.create({ data: { day_id: dayId, habit_id: habitId } })
  }

  async deleteHabitFromDay(habitId: string, dayId: string): Promise<void> {
    await prisma.dayHabit.delete({
      where: {
        day_id_habit_id: {
          day_id: dayId,
          habit_id: habitId,
        },
      },
    })
  }

  async createByDate(date: Date): Promise<Day> {
    const parsedDate = dayjs(date).startOf('day').toDate()
    const day = await prisma.day.create({
      data: { date: parsedDate },
      include: { DayHabits: true },
    })

    return PrismaDayToEntity.toEntity(day)
  }

  async getDayHabit(habitId: string, dayId: string): Promise<Day | undefined> {
    const dayHabit = await prisma.day.findFirst({
      where: {
        id: dayId,
        DayHabits: {
          some: {
            day_id: dayId,
            habit_id: habitId,
          },
        },
      },

      include: {
        DayHabits: true,
      },
    })

    if (!dayHabit) return undefined

    return PrismaDayToEntity.toEntity(dayHabit)
  }

  async getDayByDate(date: Date): Promise<Day | undefined> {
    const parsedDate = dayjs(date).startOf('day').toDate()
    const day = await prisma.day.findUnique({
      where: { date: parsedDate },
      include: { DayHabits: true },
    })

    if (!day) return undefined

    return PrismaDayToEntity.toEntity(day)
  }
}
