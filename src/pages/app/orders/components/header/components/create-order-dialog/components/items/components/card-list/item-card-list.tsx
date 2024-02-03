import { useCreateOrderFormContext } from '@/hooks/use-order-items'

import { ItemCard } from './components/item-card/item-card'

export function ItemCardList() {
  const {
    fieldArrayMethods: { fields: items },
  } = useCreateOrderFormContext()

  return (
    <>
      <div className="flex max-h-52 flex-col gap-2 overflow-auto">
        {items.map((item, index) => (
          <ItemCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </>
  )
}
