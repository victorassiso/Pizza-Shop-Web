import { Pencil } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { UpdateProductDialog } from '../update-product-dialog/update-product-dialog'

export interface ProductsTableRowProps {
  productId: string
  productName: string
  category: string
  price: number
  description?: string
}

export function ProductsTableRow({
  productId,
  productName,
  category,
  price,
  description,
}: ProductsTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">
        {productId}
      </TableCell>
      <TableCell className="font-medium">{productName}</TableCell>
      <TableCell className="font-medium">{description}</TableCell>
      <TableCell className="font-medium">{category}</TableCell>
      <TableCell className="font-medium">
        {price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Pencil className="h-3 w-3" />
              <span className="sr-only">Detalhes do produto</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UpdateProductDialog
              id={productId}
              name={productName}
              description={description}
              category={category}
              price={price}
            />
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
