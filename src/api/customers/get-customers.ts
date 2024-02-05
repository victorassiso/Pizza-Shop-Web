import { api } from '@/lib/axios'

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface PaginationMeta {
  pageIndex: number
  perPage: number
  totalCount: number
}

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
  customers: Customer[]
  meta: PaginationMeta
}

export async function getCustomers(data: GetCustomersRequest) {
  const response = await api.get<GetCustomersResponse>('/customers', {
    params: { ...data },
  })

  return response.data
}
