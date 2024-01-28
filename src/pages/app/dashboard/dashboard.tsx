import { Helmet } from 'react-helmet-async'

import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthCanceledOrdersAmount } from './month-canceled-orders-amount'
import { MonthOrdersAmountCard } from './month-orders-amount-card'
import { MonthRevenueCard } from './month-revenue-card'
import { PopularProductsChart } from './popular-products'
import { RevenueChart } from './revenue-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="flex gap-4 overflow-auto pb-2">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmount />
        </div>

        <div className="gap-4 space-y-4 xl:grid xl:grid-cols-9 xl:space-y-0">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  )
}
