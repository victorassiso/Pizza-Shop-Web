import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { useScreenSize } from '@/hooks/use-screen-size'

import { OrdersFilterRow } from '../desktop/orders-filter-row'
import { OrdersFilterSheet } from '../mobile/orders-filter-sheet'

const OrdersFilterFormSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

export type OrdersFilterFormType = z.infer<typeof OrdersFilterFormSchema>

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { screenWidth } = useScreenSize()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const ordersFilterMethods = useForm<OrdersFilterFormType>({
    resolver: zodResolver(OrdersFilterFormSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  const { reset } = ordersFilterMethods

  function handleFilter({
    orderId,
    customerName,
    status,
  }: OrdersFilterFormType) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }

      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')

      reset({
        orderId: '',
        customerName: '',
        status: 'all',
      })
      return state
    })
  }
  return (
    <FormProvider {...ordersFilterMethods}>
      {screenWidth <= 1400 ? (
        <OrdersFilterSheet
          handleClearFilters={handleClearFilters}
          handleFilter={handleFilter}
        />
      ) : (
        <OrdersFilterRow
          handleClearFilters={handleClearFilters}
          handleFilter={handleFilter}
        />
      )}
    </FormProvider>
  )
}
