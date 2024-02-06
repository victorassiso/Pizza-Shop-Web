import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'

import { ItemTable } from './components/desktop/order-items-table'
import { ItemCardList } from './components/mobile/order-items-card-list'

export function Items() {
  const {
    fieldArrayMethods: { append, fields: items },
    formMethods: {
      formState: { errors },
    },
  } = useCreateOrderFormContext()

  function addItem() {
    append({
      product: {
        id: '',
        name: '',
        price: 0,
      },
      quantity: 0,
      subtotal: 0,
    })
  }

  const total = items.reduce((acc, cur) => {
    const subtotal = cur.product.price * cur.quantity
    return acc + subtotal
  }, 0)

  return (
    <>
      <div className="flex flex-col">
        <div className="ml-4 mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Label className="text-right">Itens: </Label>
            {errors.items && (
              <span className="text-rose-500">
                {errors.items.message ===
                'Array must contain at least 1 element(s)'
                  ? 'Adicione ao menos um item ao pedido'
                  : errors.items.message}
              </span>
            )}
          </div>
          {items.length === 0 && (
            <Button
              type="button"
              variant="secondary"
              onClick={addItem}
              className="md:hidden"
            >
              Adicionar
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={addItem}
            className="hidden md:block"
          >
            Adicionar
          </Button>
        </div>
        <div className="mt-4 hidden md:block">
          <ItemTable />
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-8 md:hidden">
        <ItemCardList />
        <div className="flex justify-between">
          <div>
            <span className="text-sm text-muted-foreground">Total: </span>
            <span className="text-lg font-bold">
              {total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          {items.length > 0 && (
            <Button type="button" variant="secondary" onClick={addItem}>
              Adicionar
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
