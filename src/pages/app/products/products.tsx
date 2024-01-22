import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getProducts } from '@/api/product/get-products'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ProductTableRow } from './product-table-row'

export function Products() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[140px]">Nome</TableHead>
                  <TableHead className="w-[180px]">Descrição</TableHead>
                  <TableHead className="w-[140px]">Categoria</TableHead>
                  <TableHead className="w-[140px]">Preço</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products &&
                  products.map((product) => {
                    return (
                      <ProductTableRow
                        key={product.id}
                        productId={product.id}
                        category={product.category}
                        description={product.description}
                        productName={product.name}
                        retailPrice={product.retail_price}
                      />
                    )
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
