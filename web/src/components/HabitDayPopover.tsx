import { getHabitsList } from '@/services/get-habits-list'
import { toggleHabit } from '@/services/toggle-habit'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { X } from 'phosphor-react'
import { CheckBox } from './CheckBox'
import { Loading } from './Loading'

type Props = {
  date: Date
}

export function HabitsPopover({ date }: Props) {
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  const { data, isLoading, refetch } = useQuery(
    ['habit-list', date.toDateString()],
    () => getHabitsList(date),
  )

  const queryClient = useQueryClient()

  const { mutate: handleToggleHabit, isLoading: isInToggle } = useMutation<
    void,
    any,
    { id: string }
  >(({ id }) => toggleHabit(id), {
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries(['summary'])
    },
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 pb-0 animate-show">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-3 mt-6">
        {data?.possibleHabits.length === 0 && (
          <div className="flex flex-col items-center justify-center animate-show gap-3">
            <X className="text-red-500 w-6 h-6 outline outline-zinc-800 rounded p-1" />
            <span>Nenhum hábito cadastrado para este dia</span>
          </div>
        )}

        {data?.possibleHabits.length !== 0 && (
          <>
            {data?.possibleHabits.map((possibleHabit) => {
              return (
                <CheckBox
                  key={possibleHabit.id}
                  disabled={isDateInPast || isInToggle}
                  labelText={possibleHabit.title}
                  weight="bold"
                  checked={data.completedHabits?.includes(possibleHabit.id)}
                  onCheckedChange={() =>
                    handleToggleHabit({ id: possibleHabit.id })
                  }
                />
              )
            })}
          </>
        )}
      </div>
    </>
  )
}
