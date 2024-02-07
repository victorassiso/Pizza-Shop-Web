import { api } from '@/lib/axios'

interface DeliverOrderRequest {
  id: string
}

export async function deliverOrder({ id }: DeliverOrderRequest) {
  await api.patch(`/orders/${id}/deliver`)
}
