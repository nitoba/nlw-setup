import { api } from '@/lib/axios'
import { parseCookies } from 'nookies'

type CreateNewHabitRequest = {
  title: string
  weekDays: number[]
}

export async function createNewHabit({
  title,
  weekDays,
}: CreateNewHabitRequest) {
  const cookies = parseCookies()
  const token = cookies['@habits_tracker:access_token']
  await api.post(
    '/habits',
    {
      title,
      weekDays,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}
