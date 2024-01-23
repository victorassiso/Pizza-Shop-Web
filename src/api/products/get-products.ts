import { api } from '@/lib/axios'

export interface Product {
  id: string
  name: string
  description: string | null
  category: string
  price: number
  workspaceId: string
  createdAt: Date
  updatedAt: Date
}

export interface GetProductsResponse {
  products: Product[]
}

export async function getProducts() {
  const response = await api.get<GetProductsResponse>('/products')
  const products = response.data.products
  return products
}
