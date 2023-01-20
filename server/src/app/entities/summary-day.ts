export interface SummaryDayProps {
  id: string
  date: Date
  amount: number
  completed: number
}

export class SummaryDay {
  protected props: SummaryDayProps

  constructor(props: SummaryDayProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get date() {
    return this.props.date
  }

  get amount() {
    return this.props.amount
  }

  get completed() {
    return this.props.completed
  }

  set id(value: string) {
    this.props.id = value
  }

  set date(value: Date) {
    this.props.date = value
  }

  set amount(value: number) {
    this.props.amount = value
  }

  set completed(value: number) {
    this.props.completed = value
  }
}
