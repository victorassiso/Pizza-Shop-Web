'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { getProducts } from '@/api/products/get-products'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

import { CreateProductDialog } from '../../products/create-product-dialog'
import { CreateOrderSchema } from '../orders'

interface ProductComboboxProps {
  index: number
}

export function ProductsCombobox({ index }: ProductComboboxProps) {
  const { setValue, register, getValues } = useFormContext<CreateOrderSchema>()
  const [openPopover, setOpenPopover] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover} modal={true}>
      <PopoverTrigger asChild>
        <button className="relative flex w-[280px] cursor-pointer items-center">
          <Input
            id="productId"
            className="hidden"
            value={getValues().items[index].product?.id || ''}
            {...register(`items.${index}.product.id`)}
          />
          <Input
            id="productName"
            className="flex-1 cursor-pointer rounded-l border px-4 py-2"
            value={getValues().items[index].product?.name || ''}
            placeholder="Selecione um produto..."
            {...register(`items.${index}.product.name`)}
            autoComplete="off"
          />
          <Input
            id="productId"
            className="hidden"
            value={getValues().items[index].product.price}
            {...register(`items.${index}.product.price`)}
          />
          <ChevronsUpDown className="absolute right-0 mr-4 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Busque um cliente..." />
          <ScrollArea>
            <CommandEmpty>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button>Novo cliente</Button>
                </DialogTrigger>
                <CreateProductDialog setOpenDialog={setOpenDialog} />
              </Dialog>
            </CommandEmpty>
            <CommandGroup>
              {products?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    if (
                      currentValue ===
                      getValues().items[index].product.name.toLowerCase()
                    ) {
                      setValue(`items.${index}.product.id`, '')
                      setValue(`items.${index}.product.name`, '')
                      setValue(`items.${index}.product.price`, 0)
                      setValue(`items.${index}.quantity`, 0)
                      setValue(`items.${index}.subtotal`, 0)
                    } else {
                      setValue(`items.${index}.product.id`, item.id)
                      setValue(`items.${index}.product.name`, item.name)
                      setValue(`items.${index}.product.price`, item.price)
                      setValue(`items.${index}.quantity`, 1)
                      setValue(
                        `items.${index}.subtotal`,
                        getValues().items[index].product.price,
                      )
                    }
                    setOpenPopover(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      getValues().items[index].product.name === item.name
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
