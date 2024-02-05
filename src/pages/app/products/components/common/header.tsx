import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { CreateProductDialog } from './create-product-dialog'
import { Filter } from './filter'

const CreateProductFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  category: z.string().min(1),
  price: z.number(),
})

export type CreateProductFormType = z.infer<typeof CreateProductFormSchema>

export function Header() {
  const [openDialog, setOpenDialog] = useState(false)

  const createProductFormMethods = useForm<CreateProductFormType>({
    resolver: zodResolver(CreateProductFormSchema),
  })

  const { reset } = createProductFormMethods

  function handleOpenDialog(open: boolean) {
    if (!open) {
      reset()
    }
    setOpenDialog(open)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
        <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
          <DialogTrigger asChild>
            <Button>Novo produto</Button>
          </DialogTrigger>
          <FormProvider {...createProductFormMethods}>
            <CreateProductDialog handleOpenDialog={handleOpenDialog} />
          </FormProvider>
        </Dialog>
      </div>
      <Filter />
    </div>
  )
}
