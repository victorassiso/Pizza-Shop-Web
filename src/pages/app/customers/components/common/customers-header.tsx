import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { CreateCustomerDialog } from './create-customer-dialog'
import { CustomersFilter } from './customers-filter'

export function CustomersHeader() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>Novo cliente</Button>
          </DialogTrigger>
          <CreateCustomerDialog setOpenDialog={setOpenDialog} />
        </Dialog>
      </div>
      <CustomersFilter />
    </div>
  )
}
