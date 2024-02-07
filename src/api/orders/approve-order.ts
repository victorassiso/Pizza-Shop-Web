import { api } from '@/lib/axios'

interface ApproveOrderRequest {
  id: string
}

export async function approveOrder({ id }: ApproveOrderRequest) {
  await api.patch(`/orders/${id}/approve`)
}
