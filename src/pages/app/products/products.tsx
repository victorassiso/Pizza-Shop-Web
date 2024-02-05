import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getProducts } from '@/api/products/get-products'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Header } from './components/header/header'
import { ProductTableRow } from './product-table-row'
import { ProductTableSkeleton } from './product-table-skeleton'

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

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
      <div className="space-y-2.5">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-3/14">Identificador</TableHead>
                <TableHead className="w-2/14">Nome</TableHead>
                <TableHead className="w-4/14">Descrição</TableHead>
                <TableHead className="w-2/14">Categoria</TableHead>
                <TableHead className="w-2/14">Preço</TableHead>
                <TableHead className="w-1/14"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingProducts && (
                <div className="flex justify-center">
                  <ProductTableSkeleton />
                </div>
              )}
              {response &&
                response.products.map((product) => {
                  return (
                    <ProductTableRow
                      key={product.id}
                      productId={product.id}
                      category={product.category}
                      description={product.description}
                      productName={product.name}
                      price={product.price}
                    />
                  )
                })}
            </TableBody>
          </Table>
        </div>
      </div>
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
