import { useQuery } from '@tanstack/react-query'

import { GetOrdersResponseData } from '@/api/orders/get-orders'
import { getProducts } from '@/api/products/get-products'

export function useProductsQuery(searchParams: URLSearchParams) {
  const { id, name, category, description, minPrice, maxPrice, pageIndex } =
    searchParams

  const useProductsQuery = useQuery({
    queryKey: [
      'products',
      pageIndex,
      10, // perPage
      id,
      name,
      category,
      description,
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      getProducts({
        pageIndex,
        perPage: 10,
        id,
        name,
        category,
        description,
        minPrice,
        maxPrice,
      }),
  })

  const queryClient = useQueryClient()

  function updateOrdersCache(order: Order, customerName: string) {
    const cached = queryClient.getQueryData<GetOrdersResponse>([
      'orders',
      0, // pageIndex
      null, // orderId
      null, // customerName
      null, // status
    ])
    if (!cached) {
      return
    }

    queryClient.setQueryData<GetOrdersResponseData>(
      [
        'orders',
        0, // pageIndex
        null, // orderId
        null, // customerName
        null, // status
      ],
      {
        ...cached,
        orders: [
          {
            orderId: order.id,
            createdAt: order.createdAt,
            status: order.status,
            customerName,
            total: order.total,
          },
          ...cached.orders,
        ],
      },
    )
  }

  return useProductsQuery
}
