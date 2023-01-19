export interface DayProps {
  id: string
  date: Date
  habitIds: string[]
}

export class Day {
  private props: DayProps

  constructor(props: DayProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get date(): Date {
    return this.props.date
  }

  get habitIds() {
    return this.props.habitIds
  }

  set date(date: Date) {
    this.props.date = date
  }

  set habitIds(habitIds: string[]) {
    this.props.habitIds = habitIds
  }
}
