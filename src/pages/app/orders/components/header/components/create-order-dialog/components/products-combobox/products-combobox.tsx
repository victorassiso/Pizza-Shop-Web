'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { getProducts } from '@/api/products/get-products'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'
import { cn } from '@/lib/utils'

interface ProductComboboxProps {
  index: number
}

export function ProductsCombobox({ index }: ProductComboboxProps) {
  const {
    formMethods: { register },
    fieldArrayMethods: { update, fields: items },
  } = useCreateOrderFormContext()
  const [openPopover, setOpenPopover] = useState(false)
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover} modal={true}>
      <PopoverTrigger asChild>
        <button className="relative flex w-[218px] cursor-pointer items-center">
          <Input
            id="productId"
            className="hidden"
            value={items[index].product.id || ''}
            {...register(`items.${index}.product.id`)}
          />
          <Input
            id="productName"
            className="flex-1 cursor-pointer rounded-l border px-4 py-2"
            value={items[index].product.name || ''}
            placeholder="Selecione um produto..."
            {...register(`items.${index}.product.name`)}
            autoComplete="off"
          />
          <Input
            id="productPrice"
            className="hidden"
            value={items[index].product.price || 0}
            {...register(`items.${index}.product.price`)}
          />
          <ChevronsUpDown className="absolute right-0 mr-4 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Busque um cliente..." />
          <ScrollArea>
            <CommandEmpty>Produto não encontrado</CommandEmpty>
            <CommandGroup>
              {products?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    if (
                      currentValue === items[index].product.name.toLowerCase()
                    ) {
                      update(index, {
                        product: {
                          id: '',
                          name: '',
                          price: 0,
                        },
                        quantity: 0,
                        subtotal: 0,
                      })
                    } else {
                      update(index, {
                        product: {
                          id: item.id,
                          name: item.name,
                          price: item.price,
                        },
                        quantity: 1,
                        subtotal: item.price,
                      })
                    }
                    setOpenPopover(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      items[index].product.name === item.name
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
