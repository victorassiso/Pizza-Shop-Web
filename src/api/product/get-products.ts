import { api } from '@/lib/axios'

export interface GetProductsQuery {
  pageIndex?: number | null
  productId?: string | null
  productName?: string | null
  category?: string | null
}
export interface GetProductsResponse {
  products: {
    productId: string
    createdAt: string
    productName: string
    category: string
    retailPrice: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getProducts({
  pageIndex,
  productId,
  productName,
  category,
}: GetProductsQuery) {
  const response = await api.get<GetProductsResponse>('/products', {
    params: {
      pageIndex,
      productId,
      productName,
      category,
    },
  })

  return response.data
}
