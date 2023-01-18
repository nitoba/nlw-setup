import { HabitController } from '../http/controllers/habit-controller'
import { PrismaHabitsRepository } from '../database/prisma/repositories/prisma-habits-repository'
import { GetAllHabits } from '../../app/usecases/get-all-habits'
import { PrismaAuthRepository } from '../database/prisma/repositories/prisma-auth-repository'
import { AuthController } from '../http/controllers/auth-controller'
import { RegisterUser } from '../../app/usecases/register-user'
import { CreateHabit } from '../../app/usecases/create-habit'

export function authDependencies() {
  const authRepository = new PrismaAuthRepository()
  const registerUserUsecase = new RegisterUser(authRepository)
  const authController = new AuthController(registerUserUsecase)

  return { authController }
}

export function habitDependencies() {
  const habitRepository = new PrismaHabitsRepository()
  const getAllHabits = new GetAllHabits(habitRepository)
  const createHabit = new CreateHabit(habitRepository)
  const habitController = new HabitController(getAllHabits, createHabit)

  return { habitController }
}