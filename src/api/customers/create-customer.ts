import { CustomerDTO } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

export interface CreateCustomerRequest {
  name: string
  email: string
  address: string
  phone: string
}

export interface CreateCustomerResponse {
  customer: CustomerDTO
}

export async function createCustomer({
  name,
  email,
  address,
  phone,
}: CreateCustomerRequest) {
  const response = await api.post<CreateCustomerResponse>('/customers', {
    name,
    email,
    address,
    phone,
  })

  const customer = response.data.customer

  return customer
}
