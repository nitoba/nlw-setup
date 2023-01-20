import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

type Props = Checkbox.CheckboxProps & {
  labelText: string
}

export function CheckBox({ labelText, ...props }: Props) {
  return (
    <label className="flex gap-3 items-center hover:opacity-90 transition-opacity cursor-pointer select-none">
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
        transition-colors
        border-zinc-800
        bg-zinc-900"
        {...props}
      >
        <Checkbox.Indicator className="animate-show delay-700">
          <Check className="w-5 h-5 text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span>{labelText}</span>
    </label>
  )
}
