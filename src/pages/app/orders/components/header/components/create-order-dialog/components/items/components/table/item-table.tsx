import { FieldArrayWithId, useFormContext } from 'react-hook-form'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CreateOrderType } from '@/pages/app/orders/components/header/header'

import { ItemTableRow } from './components/item-table-row'

interface ItemTableProps {
  items: FieldArrayWithId<CreateOrderType>[]
  removeItem: (index: number) => void
}
export function ItemTable({ items, removeItem }: ItemTableProps) {
  const { watch } = useFormContext<CreateOrderType>()
  const watchedItems = watch('items')

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="">Produto</TableHead>
          <TableHead className="w-1/6 text-right">Qtd.</TableHead>
          <TableHead className="w-1/6 text-right">Preço</TableHead>
          <TableHead className="w-1/6 text-right">Subtotal</TableHead>
          <TableHead className="w-0 text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => {
          return (
            <ItemTableRow
              key={item.id}
              index={index}
              item={item}
              removeItem={removeItem}
            />
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1}>Total do pedido</TableCell>
          <TableCell colSpan={2} className="text-right font-medium"></TableCell>
          <TableCell colSpan={1} className="text-right font-medium">
            <span>
              {watchedItems
                .reduce((acc, cur) => acc + cur.subtotal, 0)
                .toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
            </span>
          </TableCell>
          <TableCell colSpan={1}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
