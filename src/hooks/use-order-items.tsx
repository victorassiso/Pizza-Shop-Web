import { useContext } from 'react'

import { CreateOrderFormContext } from '@/contexts/create-order-form-context'

export function useCreateOrderFormContext() {
  const createOrderFormContext = useContext(CreateOrderFormContext)
  return createOrderFormContext
}
