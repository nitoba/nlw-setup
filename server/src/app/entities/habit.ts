export interface HabitProps {
  id: string
  title: string
  created_at?: Date
}

export class Habit {
  private props: HabitProps

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

  set title(value: string) {
    this.props.title = value
  }
}
