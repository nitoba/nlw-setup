import { Habit } from '../../../app/entities/habit'

export class HabitPresenter {
  static toView(habit: Habit) {
    return {
      id: habit.id,
      title: habit.title,
      created_at: habit.createdAt,
    }
  }
}
