import { api } from '@/lib/axios'

import { Customer } from './get-customers'

export interface CreateCustomerRequest {
  name: string
  email: string
  address: string
  phone: string
}

export interface CreateCustomerResponse {
  customer: Customer
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
