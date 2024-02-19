import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getProducts } from '@/api/products/get-products'
import { Pagination } from '@/components/pagination'
import { useProductsSearchParams } from '@/hooks/params/use-products-search-params'
import { useScreenSize } from '@/hooks/use-screen-size'

import { Header } from './components/common/products-header'
import { ProductsTable } from './components/desktop/products-table'
import { ProductsCardList } from './components/mobile/products-card-list'

export function Products() {
  const { screenWidth } = useScreenSize()
  const { queryKey, formattedSearchParams, setSearchParams } =
    useProductsSearchParams(10)

  const { data: response, isLoading: isLoadingProducts } = useQuery({
    queryKey,
    queryFn: () =>
      getProducts({
        ...formattedSearchParams,
        perPage: 10,
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
        <ProductsTable
          isLoadingProducts={isLoadingProducts}
          response={response}
        />
      ) : (
        <ProductsCardList
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
