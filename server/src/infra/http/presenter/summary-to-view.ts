import { SummaryDay } from '../../../app/entities/summary-day'

export class SummaryDayPresenter {
  static toJson(summaryDay: SummaryDay) {
    return {
      id: summaryDay.id,
      date: summaryDay.date,
      completed: summaryDay.completed,
      amount: summaryDay.amount,
    }
  }
}
