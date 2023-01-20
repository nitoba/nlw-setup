import { Plus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from './Button'
import { NewHabitForm } from './NewHabitForm'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <img
          src="./logo.svg"
          alt="habits logo"
          className="w-[116px] md:w-[140px]"
        />
        <Dialog.Trigger asChild onClick={() => setIsOpen(true)}>
          <Button variant="secondary" className="hidden md:flex">
            <Plus className="text-violet-500" />
            Novo Hábito
          </Button>
        </Dialog.Trigger>

        <Dialog.Trigger asChild>
          <Button variant="secondary" className="flex md:hidden">
            <Plus className="text-violet-500" />
            Novo
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
            md:w-full
            w-[90%]
            max-w-md
            rounded-2xl
            md:p-10
            p-4
            py-5
            animate-show
          bg-zinc-900"
        >
          <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:opacity-60 transition-opacity">
            <X className="w-6 h-6" />
          </Dialog.Close>
          <Dialog.Title className="font-extrabold text-3xl leading-tight">
            Criar Hábito
          </Dialog.Title>
          <NewHabitForm onSubmitted={() => setIsOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
