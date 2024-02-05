import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getProducts } from '@/api/products/get-products'
import { Pagination } from '@/components/pagination'
import { useScreenSize } from '@/hooks/use-screen-size'

import { Header } from './components/common/header'
import { ProductTable } from './components/desktop/product-table'
import { ProductCardList } from './components/mobile/product-card-list'

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { screenWidth } = useScreenSize()

  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const category = searchParams.get('category')
  const description = searchParams.get('description')
  const minPrice = z.coerce
    .number()
    .transform((value) => value || undefined)
    .parse(searchParams.get('minPrice'))
  const maxPrice = z.coerce
    .number()
    .transform((value) => value || undefined)
    .parse(searchParams.get('maxPrice'))

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: response, isLoading: isLoadingProducts } = useQuery({
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

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <Header />
      {screenWidth >= 768 ? (
        <ProductTable
          isLoadingProducts={isLoadingProducts}
          response={response}
        />
      ) : (
        <ProductCardList
          isLoadingProducts={isLoadingProducts}
          response={response}
        />
      )}
      {response && (
        <Pagination
          pageIndex={response.meta.pageIndex}
          totalCount={response.meta.totalCount}
          perPage={response.meta.perPage}
          onPageChange={handlePaginate}
        />
      )}
    </>
  )
}
