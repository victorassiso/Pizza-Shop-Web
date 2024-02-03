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
    formMethods: {
      formState: { isSubmitting },
    },
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
            <div
              className={`flex h-8 items-center justify-center gap-2 rounded-md bg-border p-2 leading-[130%] ${
                disableQuantityInput ? 'opacity-50' : ''
              }`}
            >
              <button
                type="button"
                disabled={disableQuantityInput || isSubmitting}
                className="text-muted-foreground"
                onClick={handleIncrementQuantity}
              >
                <Plus size={14} />
              </button>
              <span
                className={disableQuantityInput ? 'text-muted-foreground' : ''}
              >
                {item.quantity}
              </span>

              <button
                type="button"
                className="text-muted-foreground"
                disabled={
                  disableQuantityInput ||
                  isSubmitting ||
                  items[index].quantity <= 1
                }
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
