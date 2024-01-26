import { Trash } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createOrderContext } from '@/contexts/create-order-context'

export function ItemList() {
  const { items, updateItem, removeItem } = useContext(createOrderContext)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const totalCount = items?.reduce(
      (acc, curr) => curr.product.price * curr.quantity + acc,
      0,
    )
    setTotal(totalCount)
  }, [items])

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead className="w-[100px] text-right">Qtd.</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items?.map((item) => {
            const price = item.product.price
            const subtotal = price * item.quantity

            return (
              <TableRow key={item.product.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      updateItem({
                        product: item.product,
                        quantity: parseInt(e.target.value),
                      })
                    }}
                    min={1}
                  />
                </TableCell>
                <TableCell className="text-right">
                  {price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {subtotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total do pedido</TableCell>
            <TableCell className="text-right font-medium">
              {total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
