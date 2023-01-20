import { SummaryDay } from '../../../../app/entities/summary-day'
import { SummaryRepository } from '../../../../app/repositories/summary-repository'
import { prisma } from '../../../../lib/prisma'

export class PrismaSummaryRepository implements SummaryRepository {
  async getSummary(): Promise<SummaryDay[]> {
    const summary = await prisma.$queryRaw`
          SELECT
            D.id, 
            D.date,
            (
              SELECT 
                cast(count(*) as float)
              FROM day_habits as DH
              WHERE DH.day_id = D.id
            ) as completed,
            (
              SELECT
                cast(count(*) as float)
              FROM habit_week_days HWD
              JOIN habits H
    	          ON H.id = HWD.habit_id
              WHERE HWD.week_day = extract(dow from D.date)
              AND H.created_at <= D.date
            ) as amount
          FROM days as D
        `
    return summary as SummaryDay[]
  }
}
