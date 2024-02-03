import { Minus, Plus, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, FieldArrayWithId } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/table'
import { CreateOrderType } from '@/contexts/create-order-form-context'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'

import { ProductsCombobox } from '../../../../products-combobox/products-combobox'

interface ItemTableRowProps {
  index: number
  item: FieldArrayWithId<CreateOrderType>
}

export function ItemTableRow({ index, item }: ItemTableRowProps) {
  const {
    formMethods: { register, control },
    fieldArrayMethods: { remove, fields: items, update },
  } = useCreateOrderFormContext()

  const [disableQuantityInput, setDisableQuantityInput] = useState(true)

  useEffect(() => {
    if (items?.[index].product?.id === '') {
      setDisableQuantityInput(true)
    } else {
      setDisableQuantityInput(false)
    }
  }, [index, items])

  return (
    <TableRow>
      <TableCell>
        <ProductsCombobox index={index} />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            disabled={disableQuantityInput}
            variant="outline"
            className="h-5 w-5 p-0"
            onClick={() =>
              update(index, {
                ...item,
                quantity: item.quantity + 1,
              })
            }
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Input
            className="disabled:cursor-default"
            {...register(`items.${index}.quantity`, {
              valueAsNumber: true,
            })}
            onBlur={(e) => {
              const parsedValue = parseInt(e.target.value)
              const value = parsedValue >= 1 ? parsedValue : 1
              update(index, {
                ...item,
                quantity: value,
                subtotal: item.product.price * value,
              })
            }}
            min={1}
            disabled={disableQuantityInput}
            type="number"
          />
          <Button
            type="button"
            variant="outline"
            disabled={disableQuantityInput || items[index].quantity <= 1}
            className="h-5 w-5 p-0"
            onClick={() =>
              update(index, {
                ...item,
                quantity: item.quantity - 1,
              })
            }
          >
            <Minus className="h-4 w-4" />
          </Button>
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
        <Button type="button" variant="outline" onClick={() => remove(index)}>
          <Trash size={18} />
        </Button>
      </TableCell>
    </TableRow>
  )
}
