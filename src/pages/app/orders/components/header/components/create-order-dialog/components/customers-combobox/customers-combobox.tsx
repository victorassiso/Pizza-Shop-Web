'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

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
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCreateOrderFormContext } from '@/hooks/use-order-items'
import { cn } from '@/lib/utils'

import { CreateCustomerDialog } from '../../../../../../../customers/create-customer-dialog'

export function CustomersCombobox() {
  const {
    formMethods: { setValue, register, getValues },
  } = useCreateOrderFormContext()
  const [openPopover, setOpenPopover] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  // const [customer, setCustomer] = useState<Customer | null>(null)
  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({}),
  })

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover} modal={true}>
      <PopoverTrigger asChild>
        <button className="relative flex w-[190px] cursor-pointer items-center md:w-[250px]">
          <Input
            id="customerName"
            className="flex-1 cursor-pointer rounded-l border px-4 py-2"
            value={getValues().customerName}
            placeholder="Selecione um cliente..."
            {...register('customerName')}
            autoComplete="off"
          />
          <Input
            id="customerId"
            className="hidden"
            value={getValues().customerId}
            {...register('customerId')}
          />
          <ChevronsUpDown className="absolute right-0 mr-4 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[190px] p-0 md:w-[250px]">
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
              {customers?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    if (
                      currentValue === getValues().customerName.toLowerCase()
                    ) {
                      setValue('customerId', '')
                      setValue('customerName', '')
                    } else {
                      setValue('customerId', item.id)
                      setValue('customerName', item.name)
                    }
                    setOpenPopover(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      getValues().customerName === item.name
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
