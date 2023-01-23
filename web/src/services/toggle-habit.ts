import { api } from '@/lib/axios'

export async function toggleHabit(id: string) {
  await api.patch(`/habits/${id}/toggle`)
}
