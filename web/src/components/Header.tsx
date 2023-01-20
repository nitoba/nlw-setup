import { Plus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from './Button'
import { NewHabitForm } from './NewHabitForm'

export function Header() {
  return (
    <Dialog.Root>
      <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <img src="./logo.svg" alt="habits logo" />
        <Dialog.Trigger asChild>
          <Button variant="secondary">
            <Plus className="text-violet-500" />
            Novo Hábito
          </Button>
        </Dialog.Trigger>
      </header>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-[50] backdrop-blur-sm animate-show" />
        <Dialog.Content
          className="
            fixed
            top-1/2
            left-1/2
            translate-x-[-50%]
            translate-y-[-50%]
            z-[51]
            w-full
            max-w-md
            rounded-2xl
            p-10
            animate-show
          bg-zinc-900"
        >
          <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:opacity-60 transition-opacity">
            <X className="w-6 h-6" />
          </Dialog.Close>
          <Dialog.Title className="font-extrabold text-3xl leading-tight">
            Criar Hábito
          </Dialog.Title>
          <NewHabitForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
