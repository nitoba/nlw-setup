import { api } from '@/lib/axios'

type Summary = {
  id: string
  date: string
  amount: number
  completed: number
}

export async function getSummary() {
  const { data } = await api.get<Summary[]>('/summary')

  return data
}
