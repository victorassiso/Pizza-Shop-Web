import { PaginationMeta, ProductDTO } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

export interface GetProductsRequest {
  pageIndex?: number
  perPage?: number
  id?: string
  name?: string
  description?: string
  category?: string
  minPrice?: number
  maxPrice?: number
}

export interface GetProductsResponse {
  products: ProductDTO[]
  meta: PaginationMeta
}

export async function getProducts({
  pageIndex,
  perPage,
  id,
  name,
  category,
  description,
  minPrice,
  maxPrice,
}: GetProductsRequest) {
  const response = await api.get<GetProductsResponse>('/products', {
    params: {
      pageIndex,
      perPage,
      id,
      name,
      category,
      description,
      minPrice,
      maxPrice,
    },
  })

  return response.data
}
