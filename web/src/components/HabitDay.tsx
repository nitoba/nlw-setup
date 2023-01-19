import { cva, type VariantProps } from 'class-variance-authority'

const habitStyles = cva(
  ['w-10', 'h-10', 'bg-zinc-900', 'border-2', 'border-zinc-800', 'rounded-lg'],
  {
    variants: {
      noInteractive: {
        true: 'opacity-40',
      },
    },
  },
)

type Props = VariantProps<typeof habitStyles>

export function HabitDay({ noInteractive }: Props) {
  return <div className={habitStyles({ noInteractive })} />
}
