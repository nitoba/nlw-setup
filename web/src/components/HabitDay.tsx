import * as Popover from '@radix-ui/react-popover'
import { ProgressBar } from './ProgressBar'
import clsx from 'clsx'
import { CheckBox } from './CheckBox'
import dayjs from 'dayjs'

type Props = {
  amount?: number
  completed?: number
  date: Date
}

export function HabitDay({ amount = 0, completed = 0, date }: Props) {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 border-2 bg-zinc-900 border-zinc-800 rounded-lg enabled:hover:scale-90 transition-all',
          {
            'bg-zinc-900 border-zinc-800': completedPercentage === 0,
            'bg-violet-900 border-violet-700':
              completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 border-violet-600':
              completedPercentage >= 20 && completedPercentage < 40,
            'bg-violet-700 border-violet-500':
              completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 border-violet-500':
              completedPercentage >= 80 && completedPercentage < 80,
            'bg-violet-500 border-violet-500': completedPercentage >= 80,
          },
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col animate-show">
          <header className="flex flex-col">
            <span className="text-zinc-400 font-semibold">{dayOfWeek}</span>
            <span className="text-3xl font-extrabold mt-2 leading-tight">
              {dayAndMonth}
            </span>
            <ProgressBar progress={40} />
          </header>
          <div className="flex flex-col gap-3 mt-6">
            <CheckBox labelText={'2L de água'} weight="bold" />
            <CheckBox labelText={'Alimentação saudável'} weight="bold" />
          </div>
          <Popover.Arrow className="fill-zinc-900 w-4 h-2" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
