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

export interface GetCustomersRequest {
  pageIndex?: number
  id?: string
  name?: string
  email?: string
  address?: string
  phone?: string
}

export interface GetCustomersResponse {
  customers: Customer[]
}

export async function getCustomers(data: GetCustomersRequest) {
  const response = await api.get<GetCustomersResponse>('/customers', {
    params: { ...data },
  })

  return response.data
}
