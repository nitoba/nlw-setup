import { randomUUID } from 'crypto'
import { Day } from '../app/entities/day'
import { Habit } from '../app/entities/habit'

const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

const fourthHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const fourthHabitCreationDate = new Date('2023-01-18T03:00:00.000Z')

export function seed() {
  const habits = [
    new Habit({
      id: firstHabitId,
      title: 'Beber 2L água',
      created_at: firstHabitCreationDate,
      weekDays: [1, 2, 3],
    }),
    new Habit({
      id: secondHabitId,
      title: 'Exercitar',
      created_at: secondHabitCreationDate,
      weekDays: [3, 4, 5],
    }),
    new Habit({
      id: thirdHabitId,
      title: 'Dormir 8h',
      created_at: thirdHabitCreationDate,
      weekDays: [1, 2, 3, 4, 5],
    }),
    new Habit({
      id: fourthHabitId,
      title: 'Estudar Rust',
      created_at: fourthHabitCreationDate,
      weekDays: [1, 2, 4],
    }),
  ]

  const days = [
    new Day({
      id: randomUUID(),
      date: new Date('2023-01-02T03:00:00.000z'),
      habitIds: [firstHabitId],
    }),
    new Day({
      id: randomUUID(),
      date: new Date('2023-01-06T03:00:00.000z'),
      habitIds: [firstHabitId],
    }),
    new Day({
      id: randomUUID(),
      date: new Date('2023-01-04T03:00:00.000z'),
      habitIds: [firstHabitId, secondHabitId],
    }),
  ]

  return { habits, days }
}
