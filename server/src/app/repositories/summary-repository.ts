import { SummaryDay } from '../entities/summary-day'

export abstract class SummaryRepository {
  abstract getSummary(): Promise<SummaryDay[]>
}
