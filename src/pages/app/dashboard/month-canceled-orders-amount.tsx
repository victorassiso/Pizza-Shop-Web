import { useQuery } from '@tanstack/react-query'
import { Ban } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/metrics/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthCanceledOrdersAmount() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'monthCanceledOrdersAmount'],
    queryFn: getMonthCanceledOrdersAmount,
    staleTime: Infinity,
  })

  return (
    <Card className="w-full min-w-[250px]">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <Ban className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {monthCanceledOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthCanceledOrdersAmount.percentualDiffFromLastMonth < 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +
                  {monthCanceledOrdersAmount.percentualDiffFromLastMonth.toFixed(
                    2,
                  )}
                  %
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthCanceledOrdersAmount.percentualDiffFromLastMonth.toFixed(
                    2,
                  )}
                  %
                </span>
              )}{' '}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
