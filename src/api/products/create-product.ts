import { Product } from '@/@types/bd-entities'
import { api } from '@/lib/axios'

export interface CreateProductRequest {
  name: string
  description: string
  category: string
  price: number
}

export interface CreateProductResponse {
  product: Product
}

export async function createProduct({
  name,
  description,
  category,
  price,
}: CreateProductRequest) {
  const response = await api.post<CreateProductResponse>('/products', {
    name,
    description,
    category,
    price,
  })

  const product = response.data.product

  return product
}
