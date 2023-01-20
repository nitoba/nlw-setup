import { getSummary } from '@/services/get-summary'
import { generateRangesFromYearBeginning } from '@/utils/generate-dates-from-year-beginning'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { HabitDay } from './HabitDay'
import { Loading } from './Loading'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateRangesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

export function SummaryTable() {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
  })

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="grid grid-col-7 grid-flow-col md:grid-rows-7 md:grid-flow-row gap-1 md:gap-3">
        {weekDays.map((weekDay, i) => (
          <div
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-flow-rows md:grid-rows-7 md:grid-flow-col gap-2 md:gap-3">
        {summaryDates.map((date) => {
          const dayInSummary = summary?.find((day) => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800/40 rounded-lg"
              />
            )
          })}
      </div>
    </div>
  )
}
