import { api } from '@/lib/axios'

import { Product } from './get-products'

export interface CreateProductRequest {
  name: string
  description: string
  category: string
  cost_price: number
  retail_price: number
}

export interface CreateProductResponse {
  product: Product
}

export async function createProduct({
  name,
  description,
  category,
  cost_price,
  retail_price,
}: CreateProductRequest) {
  const response = await api.post<CreateProductResponse>('/products', {
    name,
    description,
    category,
    cost_price,
    retail_price,
  })

  const product = response.data.product

  return product
}
