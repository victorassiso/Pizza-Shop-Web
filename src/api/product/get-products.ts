import { api } from '@/lib/axios'

export interface Product {
  id: string
  name: string
  description: string | null
  category: string
  cost_price: number
  retail_price: number
  workspace_id: string
  created_at: Date
  updated_at: Date
}

export interface GetProductsResponse {
  products: Product[]
}

export async function getProducts() {
  const response = await api.get<GetProductsResponse>('/products')
  const products = response.data.products
  return products
}
