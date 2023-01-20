import { Check } from 'phosphor-react'
import { Button } from './Button'
import { CheckBox } from './CheckBox'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { createNewHabit } from '@/services/create-new-habit'
import { useToast } from '@nito-ui/react'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

const createNewHabitSchema = z.object({
  title: z.string().min(4, 'O texto deve conter pelo menos 4 caracteres'),
  weekDays: z
    .array(z.number().min(0).max(6), {
      required_error: 'É necessário marcar pelo menos um dia',
    })
    .min(1),
})

type FormSchema = z.infer<typeof createNewHabitSchema>

type Props = {
  onSubmitted: () => void
}

export function NewHabitForm({ onSubmitted }: Props) {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(createNewHabitSchema),
  })

  const { showSuccessMessage } = useToast()

  function handleSelectWeekday(
    hasChecked: boolean,
    weekDay: number,
    onChange: (...event: any[]) => void,
  ) {
    const previousWeekDaysSelected = getValues('weekDays')

    if (!previousWeekDaysSelected) {
      return onChange([weekDay])
    }
    if (!hasChecked) {
      onChange(previousWeekDaysSelected.filter((value) => value !== weekDay))
    } else {
      onChange([...previousWeekDaysSelected, weekDay])
    }
  }

  async function handleCreateNewHabit({ title, weekDays }: FormSchema) {
    await createNewHabit({ title, weekDays })

    showSuccessMessage({
      title: 'Heyy!!!',
      description: 'Hábito criado com sucesso!',
    })
    onSubmitted()
  }

  return (
    <form className="mt-6" onSubmit={handleSubmit(handleCreateNewHabit)}>
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
          {...register('title')}
        />
      </label>
      <small className="text-sm text-red-500 animate-show">
        {errors.title?.message}
      </small>
      <div className="mt-4 mb-6">
        <span className="font-semibold">Qual a recorrência?</span>
        <div className="flex flex-col gap-2 mt-3">
          {availableWeekDays.map((weekDay, i) => (
            <Controller
              key={weekDay}
              control={control}
              name="weekDays"
              render={({ field: { onChange } }) => (
                <CheckBox
                  labelText={weekDay}
                  onCheckedChange={(checked) =>
                    handleSelectWeekday(!!checked, i, onChange)
                  }
                />
              )}
            />
          ))}
        </div>
        <small className="text-sm text-red-500 animate-show mt-2 block">
          {errors.weekDays?.message}
        </small>
      </div>

      <Button
        variant="primary"
        type="submit"
        fullWidth
        size="md"
        loading={isSubmitting}
      >
        <Check size={20} weight="bold" />
        Confirmar
      </Button>
    </form>
  )
}
