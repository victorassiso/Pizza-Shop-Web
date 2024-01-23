import { api } from '@/lib/axios'

interface cancelOrderParams {
  orderId: string
}

export async function cancelOrder({ orderId }: cancelOrderParams) {
  await api.patch(`/orders/${orderId}/cancel`)
}
