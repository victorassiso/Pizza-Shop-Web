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
  console.log({ items })
  return (
    <Table className="block max-h-80">
      <TableHeader>
        <TableRow>
          <TableHead className="">Produto</TableHead>
          <TableHead className="w-1/5 text-center">Qtd.</TableHead>
          <TableHead className=" text-right">Preço</TableHead>
          <TableHead className="w-1/6 text-right">Subtotal</TableHead>
          <TableHead className="w-0 text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
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
              {items
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
