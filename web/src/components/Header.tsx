import { Plus } from 'phosphor-react'
import { Button } from './Button'

export function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src="./logo.svg" alt="habits logo" className="" />
      <Button variant="secondary">
        <Plus className="text-violet-500" />
        Novo Hábito
      </Button>
    </header>
  )
}
