import { HabitController } from '../http/controllers/habit-controller'
import { PrismaHabitsRepository } from '../database/prisma/repositories/prisma-habits-repository'
import { GetAllHabits } from '../../app/usecases/get-all-habits'

export function initContainer() {
  const habitRepository = new PrismaHabitsRepository()
  const getAllHabitsUsecase = new GetAllHabits(habitRepository)
  const controller = new HabitController(getAllHabitsUsecase)

  return { controller }
}
