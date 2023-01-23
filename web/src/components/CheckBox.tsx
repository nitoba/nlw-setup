import * as Checkbox from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'
import { Check } from 'phosphor-react'

type Props = Checkbox.CheckboxProps & {
  labelText: string
  weight?: 'bold' | 'regular'
}

export function CheckBox({ labelText, weight, disabled, ...props }: Props) {
  return (
    <label
      className={clsx(
        'flex gap-3 items-center transition-opacity cursor-pointer select-none',
        {
          'opacity-60 cursor-not-allowed': disabled,
          'hover:opacity-90': !disabled,
        },
      )}
    >
      <Checkbox.Root
        className="
        flex
        items-center
        justify-center
        w-8
        h-8
        rounded-lg
        border
        data-[state=checked]:bg-green-500
        data-[state=checked]:border-green-500
        transition-all
        border-zinc-800
        enabled:hover:brightness-90
        disabled:cursor-not-allowed
        disabled:opacity-60
        bg-zinc-900"
        disabled={disabled}
        {...props}
      >
        <Checkbox.Indicator className="animate-show delay-700">
          <Check className="w-5 h-5 text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span className={clsx({ 'font-bold': weight === 'bold' })}>
        {labelText}
      </span>
    </label>
  )
}
