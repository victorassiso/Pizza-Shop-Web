import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { getProducts } from '@/api/products/get-products'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CreateProductDialog } from './create-product-dialog'
import { ProductTableRow } from './product-table-row'
import { ProductTableSkeleton } from './product-table-skeleton'

export function Products() {
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Novo produto</Button>
            </DialogTrigger>
            <CreateProductDialog setOpenDialog={setOpenDialog} />
          </Dialog>
        </div>
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
      </div>
    </>
  )
}
