'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useContext, useState } from 'react'

import { getCustomers } from '@/api/customers/get-customers'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createOrderContext } from '@/contexts/create-order-context'
import { cn } from '@/lib/utils'

import { CreateCustomerDialog } from '../../customers/create-customer-dialog'

export function CustomerCombobox() {
  const { updateCustomer } = useContext(createOrderContext)
  const [open, setOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({}),
  })

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {customerName
            ? customers?.find(
                (customer) => customer.name.toLowerCase() === customerName,
              )?.name
            : 'Selecione um produto...'}
          {/* {customerName
            ? customers?.find(
                (customer) => customer.name.toLowerCase() === customerName,
              )?.name
            : 'Selecione um cliente...'} */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
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
                <CreateCustomerDialog setOpenDialog={setOpenDialog} />
              </Dialog>
            </CommandEmpty>
            <CommandGroup>
              {customers?.map((customer) => (
                <CommandItem
                  key={customer.name}
                  value={customer.name}
                  onSelect={(currentValue) => {
                    setCustomerName(
                      currentValue === customerName ? '' : currentValue,
                    )
                    updateCustomer(
                      currentValue === customerName ? null : customer,
                    )
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      customerName === customer.name
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {customer.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
