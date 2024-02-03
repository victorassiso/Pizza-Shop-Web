import { Trash } from 'lucide-react'
import { FieldArrayWithId } from 'react-hook-form'

import { Card } from '@/components/ui/card'
import { CreateOrderType } from '@/contexts/create-order-form-context'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'

import { ProductsCombobox } from '../../../../../products-combobox/products-combobox'
import { Quantity } from './components/quantity'

interface ItemTableRowProps {
  index: number
  item: FieldArrayWithId<CreateOrderType>
}

export function ItemCard({ item, index }: ItemTableRowProps) {
  const {
    fieldArrayMethods: { fields: items, remove },
  } = useCreateOrderFormContext()

  return (
    <Card className="flex flex-col p-3">
      <div className="flex items-center justify-between">
        <ProductsCombobox index={index} />
        <button
          type="button"
          onClick={() => remove(index)}
          className="ml-3 mr-1 text-muted-foreground"
        >
          <Trash size={14} />
        </button>
      </div>

      <div className="ml-2 mt-1 text-xs text-muted-foreground">
        <span className="">Preço: </span>
        <span className="font-bold">
          {items[index].product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>
      <div className="mx-2 mt-9 flex items-end justify-between">
        <div>
          <span className="text-lg font-bold">
            {(
              items[index].product.price * items[index].quantity
            ).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <Quantity item={item} index={index} />
      </div>
    </Card>
  )
}
