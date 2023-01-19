export interface HabitProps {
  id: string
  title: string
  weekDays?: number[]
  created_at?: Date
}

export class Habit {
  readonly props: HabitProps

  constructor(props: HabitProps) {
    this.props = props
    this.props.created_at = props.created_at ?? new Date()
  }

  get id(): string {
    return this.props.id
  }

  get title(): string {
    return this.props.title
  }

  get createdAt(): Date | undefined {
    return this.props.created_at
  }

  get weekDays(): number[] | undefined {
    return this.props.weekDays
  }

  set title(value: string) {
    this.props.title = value
  }

  set weekDays(value: number[] | undefined) {
    this.props.weekDays = value
  }
}
