import { Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

// import { OrderDetails } from './product-details'
export interface ProductTableRowProps {
  productId: string
  productName: string
  category: string
  retailPrice: number
  description: string | null
}

export function ProductTableRow({
  productId,
  productName,
  category,
  retailPrice,
  description,
}: ProductTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do produto</span>
            </Button>
          </DialogTrigger>
          {/* <OrderDetails orderId={productId} open={isDetailsOpen} /> */}
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {productId}
      </TableCell>
      <TableCell className="font-medium">{productName}</TableCell>
      <TableCell className="font-medium">{description}</TableCell>
      <TableCell className="font-medium">{category}</TableCell>
      <TableCell className="font-medium">
        {retailPrice.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
    </TableRow>
  )
}
