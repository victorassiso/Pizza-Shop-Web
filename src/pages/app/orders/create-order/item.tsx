import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/table'

import { CreateOrderSchema } from '../orders'
import { ProductsCombobox } from './products-combobox'

interface ItemProps {
  index: number
  item: {
    id: string
    product: {
      id: string
      name: string
      price: number
    }
    quantity: number
  }
  removeItem: (index: number) => void
}

export function Item({ index, item, removeItem }: ItemProps) {
  const { register, control, setValue } = useFormContext<CreateOrderSchema>()
  // const [subtotal, setSubtotal] = useState(0)
  const [disableQuantityInput, setDisableQuantityInput] = useState(true)

  const { items } = useWatch<CreateOrderSchema>()

  useEffect(() => {
    // const orderSubtotal = items?.reduce(
    //   (acc, cur) => acc + (cur.product?.price || 0) * (cur.quantity || 0),
    //   0,
    // )

    if (items?.[index].product?.id === '') {
      setDisableQuantityInput(true)
    } else {
      setDisableQuantityInput(false)
    }
    // setSubtotal(orderSubtotal || 0)
  }, [index, items])

  return (
    <TableRow>
      <TableCell>
        <ProductsCombobox index={index} />
      </TableCell>
      <TableCell className="text-right">
        <Input
          className="disabled:cursor-default"
          {...register(`items.${index}.quantity`, {
            valueAsNumber: true,
          })}
          onChange={(e) => {
            // setSubtotal(item.product.price * parseFloat(e.target.value))
            setValue(
              `items.${index}.subtotal`,
              item.product.price * parseFloat(e.target.value),
            )
          }}
          min={1}
          disabled={disableQuantityInput}
          type="number"
        />
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
        <Controller
          control={control}
          name={`items.${index}.subtotal`}
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
      <TableCell>
        <Button
          type="button"
          variant="outline"
          onClick={() => removeItem(index)}
        >
          <Trash size={18} />
        </Button>
      </TableCell>
    </TableRow>
  )
}
