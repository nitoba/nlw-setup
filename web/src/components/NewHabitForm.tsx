import { Check } from 'phosphor-react'
import { Button } from './Button'
import { CheckBox } from './CheckBox'

export function NewHabitForm() {
  return (
    <form className="mt-6">
      <label className="flex flex-col gap-2" htmlFor="title">
        <span className="font-semibold">Qual o seu comprometimento?</span>
        <input
          type="text"
          id="title"
          autoFocus
          className="
          rounded-lg
          bg-zinc-800
          placeholder:text-zinc-400
          p-4
          border
          border-transparent
          focus:outline-0
          focus:border-zinc-500
          transition-all
          "
          placeholder="Exercícios, dormir bem, etc..."
        />
      </label>
      <div className="mt-4 mb-6">
        <span className="font-semibold">Qual a recorrência?</span>
        <div className="flex flex-col gap-2 mt-3">
          <CheckBox labelText="Domingo" />
          <CheckBox labelText="Segunda" />
          <CheckBox labelText="Terça" />
          <CheckBox labelText="Quarta" />
          <CheckBox labelText="Quinta" />
          <CheckBox labelText="Sexta" />
          <CheckBox labelText="Sábado" />
        </div>
      </div>

      <Button variant="primary" type="submit" fullWidth size="md">
        <Check size={20} weight="bold" />
        Confirmar
      </Button>
    </form>
  )
}
