import { api } from '@/lib/axios'

type HabitDay = {
  possibleHabits: Array<{
    id: string
    title: string
    created_at: string
  }>
  completedHabits: string[]
}

export async function getHabitsList(date: Date) {
  const { data } = await api.get<HabitDay>('/day', {
    params: { date: date.toISOString() },
  })

  return data
}
