import { PaginationMeta, ProductDTO } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

export interface GetOrdersRequest {
  pageIndex?: number | null
  perPage?: number | null
  id?: string | null
  name?: string | null
  description?: string | null
  category?: string | null
  minPrice?: number | null
  maxPrice?: number | null
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
}: GetOrdersRequest) {
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
