import { CustomerDTO, PaginationMeta } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

export interface GetCustomersRequest {
  pageIndex?: number | null
  perPage?: number | null
  id?: string | null
  name?: string | null
  email?: string | null
  address?: string | null
  phone?: string | null
}

export interface GetCustomersResponse {
  customers: CustomerDTO[]
  meta: PaginationMeta
}

export async function getCustomers(data: GetCustomersRequest) {
  const response = await api.get<GetCustomersResponse>('/customers', {
    params: { ...data },
  })

  return response.data
}
