'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'

import { getProducts } from '@/api/products/get-products'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createOrderContext } from '@/contexts/create-order-context'
import { cn } from '@/lib/utils'

export function ProductsCombobox() {
  const { preSelectProduct, preSelectedProduct } =
    useContext(createOrderContext)

  const [open, setOpen] = useState(false)
  const [productName, setProductName] = useState('')
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  useEffect(() => {
    if (!preSelectedProduct) {
      setProductName('')
    }
  }, [preSelectedProduct])

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {productName
            ? products?.find(
                (product) => product.name.toLowerCase() === productName,
              )?.name
            : 'Selecione um produto...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Busque um produto..." />
          <ScrollArea className="overflow-hidden ">
            <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
            <CommandGroup>
              {products?.map((product) => (
                <CommandItem
                  key={product.name}
                  value={product.name}
                  onSelect={(currentValue) => {
                    setProductName(
                      currentValue === productName ? '' : currentValue,
                    )
                    preSelectProduct(
                      currentValue === productName ? null : product,
                    )
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      productName === product.name
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {product.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
