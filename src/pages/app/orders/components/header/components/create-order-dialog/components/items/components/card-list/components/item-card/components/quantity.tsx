import { Minus, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FieldArrayWithId } from 'react-hook-form'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CreateOrderType } from '@/contexts/create-order-form-context'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'

interface QuantityProps {
  index: number
  item: FieldArrayWithId<CreateOrderType>
}
export function Quantity({ item, index }: QuantityProps) {
  const {
    fieldArrayMethods: { fields: items, update },
  } = useCreateOrderFormContext()
  const [disableQuantityInput, setDisableQuantityInput] = useState(true)

  useEffect(() => {
    if (items?.[index].product?.id === '') {
      setDisableQuantityInput(true)
    } else {
      setDisableQuantityInput(false)
    }
  }, [index, items])

  function handleDecrementQuantity() {
    update(index, {
      ...item,
      quantity: item.quantity - 1,
    })
  }

  function handleIncrementQuantity() {
    update(index, {
      ...item,
      quantity: item.quantity + 1,
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-1">
            {/* <Label className="text-muted-foreground">Qtd.</Label> */}
            <div
              className={`flex h-8 items-center justify-center gap-2 rounded-md bg-border p-2 leading-[130%] ${
                disableQuantityInput ? 'opacity-50' : ''
              }`}
            >
              <button
                type="button"
                disabled={disableQuantityInput}
                className="text-muted-foreground"
                onClick={handleIncrementQuantity}
              >
                <Plus size={14} />
              </button>

              {/* <Input
    className="h-8 w-10 border-none bg-transparent p-2 disabled:cursor-default"
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
  /> */}
              <span
                className={disableQuantityInput ? 'text-muted-foreground' : ''}
              >
                {item.quantity}
              </span>

              <button
                type="button"
                className="text-muted-foreground"
                disabled={disableQuantityInput || items[index].quantity <= 1}
                onClick={handleDecrementQuantity}
              >
                <Minus size={14} />
              </button>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          className={disableQuantityInput ? 'absolute right-12 w-44' : 'hidden'}
        >
          <p>Selecione um produto.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
