import { api } from '@/lib/axios'

interface cancelOrderRequest {
  id: string
}

export async function cancelOrder({ id }: cancelOrderRequest) {
  await api.patch(`/orders/${id}/cancel`)
}
