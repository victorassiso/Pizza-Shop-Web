import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'

import { ItemTableRow } from './components/item-table-row'

export function ItemTable() {
  const {
    fieldArrayMethods: { fields: items },
  } = useCreateOrderFormContext()

  const total = items.reduce((acc, cur) => {
    const subtotal = cur.product.price * cur.quantity
    return acc + subtotal
  }, 0)

  return (
    <Table className="block h-80 w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Produto</TableHead>
          <TableHead className="w-[18%] text-center">Qtd.</TableHead>
          <TableHead className="w-[15%] text-center">Preço</TableHead>
          <TableHead className="w-[15%] text-center">Subtotal</TableHead>
          <TableHead className="w-[12%]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 && (
          <TableRow>
            <TableCell className="w-[10000px]"></TableCell>
            <TableCell className="w-[18%]"></TableCell>
            <TableCell className="w-[15%]"></TableCell>
            <TableCell className="w-[15%]"></TableCell>
            <TableCell className="w-[12%]"></TableCell>
          </TableRow>
        )}
        {items.map((item, index) => {
          return <ItemTableRow key={item.id} index={index} item={item} />
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1}>Total do pedido</TableCell>
          <TableCell colSpan={2} className="text-right font-medium"></TableCell>
          <TableCell colSpan={1} className="text-right font-medium">
            <span>
              {total.toLocaleString('pt-BR', {
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
