import { OrderDetailsDTO } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

export interface GetOrderDetailsRequest {
  id: string
}

interface GetOrderDetailsResponse {
  orderDetails: OrderDetailsDTO
}

export async function getOrderDetails({ id }: GetOrderDetailsRequest) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${id}`)

  const orderDetails = response.data.orderDetails

  return orderDetails
}
