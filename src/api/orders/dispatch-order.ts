import { api } from '@/lib/axios'

interface DispatchOrderRequest {
  id: string
}

export async function dispatchOrder({ id }: DispatchOrderRequest) {
  await api.patch(`/orders/${id}/dispatch`)
}
