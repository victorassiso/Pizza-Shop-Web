import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
// import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Product } from '@/api/products/get-products'
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
// import { createOrderContext } from '@/contexts/create-order-context'

interface Item {
  product: {
    id: string
    name: string
    price: number
  }
  quantity: number
}
export function ItemList() {
  // const { items, removeItem, updateItem } = useContext(createOrderContext)
  const { register, getValues } = useFormContext()
  const [items, setItems] = useState<Item[]>([])
  // const items: Item[] = getValues().items
  // const [total, setTotal] = useState(0)

  // useEffect(() => {
  //   const totalCount = items?.reduce(
  //     (acc, curr) => curr.product.price * curr.quantity + acc,
  //     0,
  //   )
  //   setTotal(totalCount)
  // }, [items])

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/6">Produto</TableHead>
            <TableHead className="w-1/6 text-right">Qtd.</TableHead>
            <TableHead className="w-1/6 text-right">Preço</TableHead>
            <TableHead className="w-1/6 text-right">Subtotal</TableHead>
            <TableHead className="w-1/6 text-right"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items?.map((item, index) => {
            const price = item.product.price
            const subtotal = price * item.quantity

            return (
              <TableRow key={item.product.id}>
                <TableCell className="w-2/6">
                  <Input
                    value={item.product.id}
                    className="hidden"
                    {...register(`items.${index}.productId`)}
                  />
                  {item.product.name}
                </TableCell>
                <TableCell className="w-1/6 text-right">
                  <Input
                    id={`items.${index}.quantity`}
                    type="number"
                    // value={item.quantity}
                    {...register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    // onChange={(e) => {
                    // updateItem({
                    //   product: item.product,
                    //   quantity: parseInt(e.target.value),
                    // })
                    // }}
                    min={1}
                  />
                </TableCell>
                <TableCell className="w-1/6 text-right">
                  {price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell className="w-1/6 text-right">
                  {subtotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell className="w-1/6">
                  <Button
                    type="button"
                    variant="outline"
                    // onClick={() => removeItem(item.product.id)}
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
            <TableCell className="w-1/6 text-right font-medium">
              {/* {total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })} */}
            </TableCell>
            <TableCell className="w-1/6"></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
