import { Trash } from 'lucide-react'
import { Controller, FieldArrayWithId } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { CreateOrderType } from '@/contexts/create-order-form-context'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'

import { ProductsCombobox } from '../../../products-combobox/products-combobox'
import { Quantity } from '../common/quantity'

interface ItemTableRowProps {
  index: number
  item: FieldArrayWithId<CreateOrderType>
}

export function ItemTableRow({ index, item }: ItemTableRowProps) {
  const {
    formMethods: {
      control,
      formState: { isSubmitting },
    },
    fieldArrayMethods: { remove },
  } = useCreateOrderFormContext()

  return (
    <TableRow>
      <TableCell className="w-[10000px]">
        <ProductsCombobox index={index} />
      </TableCell>
      <TableCell className="flex justify-center">
        <div className="flex items-center gap-2">
          <Quantity item={item} index={index} />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Controller
          control={control}
          name={`items.${index}.product.price`}
          render={({ field: { value } }) => {
            return (
              <span>
                {value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            )
          }}
        />
      </TableCell>
      <TableCell className="text-right">
        <span>
          {(item.product.price * item.quantity).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </TableCell>
      <TableCell>
        <Button
          disabled={isSubmitting}
          type="button"
          variant="outline"
          onClick={() => remove(index)}
        >
          <Trash size={18} />
        </Button>
      </TableCell>
    </TableRow>
  )
}
