import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'

const buttonStyles = cva(
  [
    'flex',
    'items-center',
    'justify-center',
    'gap-3',
    'text-white',
    'font-semibold',
    'border',
    'border-transparent',
    'rounded-lg',
    'enabled:hover:brightness-90',
    'transition-all',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-green-600',
        secondary: [
          'bg-transparent',
          'border-violet-500',
          'enabled:hover:border-violet-300',
        ],

        google: 'bg-red-500',
      },
      size: {
        sm: 'text-sm py-2 px-3',
        md: 'text-base py-4 px-6',
      },

      fullWidth: {
        true: 'w-full',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    />
  )
}
