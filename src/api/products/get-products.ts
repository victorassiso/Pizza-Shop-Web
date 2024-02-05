import { api } from '@/lib/axios'

export interface ProductDTO {
  id: string
  name: string
  description: string
  category: string
  price: number
}

export interface PaginationMeta {
  pageIndex: number
  perPage: number
  totalCount: number
}

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

export interface GetProductsResponseData {
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
  const response = await api.get<GetProductsResponseData>('/products', {
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
