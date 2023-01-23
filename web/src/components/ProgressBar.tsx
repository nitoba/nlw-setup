import * as Progress from '@radix-ui/react-progress'

type Props = {
  progress: number
}

export function ProgressBar({ progress }: Props) {
  return (
    <Progress.Root className="h-3 w-full bg-zinc-700 rounded-full mt-4">
      <Progress.Indicator
        className="h-full bg-violet-600 rounded-full transition-all"
        style={{
          width: `${progress}%`,
        }}
      />
    </Progress.Root>
  )
}
