'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useContext, useState } from 'react'

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
import { createOrderContext } from '@/contexts/create-order-context'
import { cn } from '@/lib/utils'

import { CreateProductDialog } from '../../products/create-product-dialog'

export function ProductsCombobox() {
  const { comboboxProduct, selectCoboboxProduct } =
    useContext(createOrderContext)
  const [openPopover, setOpenPopover] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover} modal={true}>
      <PopoverTrigger asChild>
        <button className="relative flex w-[250px] cursor-pointer items-center">
          <Input
            className="flex-1 cursor-pointer rounded-l border px-4 py-2"
            value={comboboxProduct ? comboboxProduct.name : ''}
            placeholder="Selecione um cliente..."
            onChange={(e) => {
              console.log(e)
            }}
          />
          <ChevronsUpDown className="absolute right-0 mr-4 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
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
                    if (currentValue === comboboxProduct?.name.toLowerCase()) {
                      selectCoboboxProduct(null)
                    } else {
                      selectCoboboxProduct(item)
                    }
                    setOpenPopover(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      comboboxProduct?.name === item.name
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
