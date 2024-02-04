import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getProducts } from '@/api/products/get-products'
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
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

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
              {isProductsLoading && <ProductTableSkeleton />}
              {products &&
                products.map((product) => {
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
    </>
  )
}
