import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createCustomer } from '@/api/customers/create-customer'
import { Customer } from '@/api/customers/get-customers'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface CreateCustomerDialogProps {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateCustomerDialog({
  setOpenDialog,
}: CreateCustomerDialogProps) {
  const createCustomerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    address: z.string().min(1),
    phone: z.string().min(1),
  })

  type CreateCustomerSchema = z.infer<typeof createCustomerSchema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateCustomerSchema>({
    resolver: zodResolver(createCustomerSchema),
  })

  const queryClient = useQueryClient()

  function updateCustomersCache(customer: Customer) {
    const cached = queryClient.getQueryData<Customer[]>(['customers'])

    if (!cached) {
      return
    }

    queryClient.setQueryData<Customer[]>(['customers'], [...cached, customer])
  }

  const { mutateAsync: createCustomerFn } = useMutation({
    mutationFn: createCustomer,
  })

  async function handleCreateProdct(data: CreateCustomerSchema) {
    try {
      const newCustomer = await createCustomerFn({ ...data })
      updateCustomersCache(newCustomer)
      setOpenDialog(false)
      toast.success('Produto cadastrado com sucesso')
    } catch {
      toast.error('Erro ao cadastrar produto')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Produto</DialogTitle>
        <DialogDescription>Crie um novo produto</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleCreateProdct)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3"
              id="name"
              {...register('name')}
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="email">
              E-mail
            </Label>
            <Input
              className="col-span-3"
              id="email"
              type="text"
              {...register('email')}
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="address">
              Endereço
            </Label>
            <Textarea
              className="col-span-3"
              id="address"
              {...register('address')}
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="phone">
              Telefone
            </Label>
            <Input
              className="col-span-3"
              id="phone"
              {...register('phone')}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
