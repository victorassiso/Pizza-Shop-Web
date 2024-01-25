import { api } from '@/lib/axios'

export interface GetMonthRevenueResponse {
  amount: number
  percentualDiffFromLastMonth: number
}

export async function getMonthRevenue() {
  const response = await api.get<GetMonthRevenueResponse>(
    '/metrics/month-revenue',
  )

  return response.data
}
