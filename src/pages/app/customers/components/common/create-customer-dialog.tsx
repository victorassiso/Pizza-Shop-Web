import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createCustomer } from '@/api/customers/create-customer'
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
import { useCustomersCache } from '@/hooks/cache/user-customers-cache'
import { isApiError } from '@/lib/axios'

const createCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
})

type CreateCustomerSchema = z.infer<typeof createCustomerSchema>
interface CreateCustomerDialogProps {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateCustomerDialog({
  setOpenDialog,
}: CreateCustomerDialogProps) {
  const { handleUpdateCustomersCache } = useCustomersCache()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateCustomerSchema>({
    resolver: zodResolver(createCustomerSchema),
  })

  const { mutateAsync: createCustomerFn } = useMutation({
    mutationFn: createCustomer,
    retry(failureCount, error) {
      if (isApiError(error) && error.response?.status === 409) {
        return false
      }
      if (failureCount >= 2) {
        return false
      }

      return true
    },
  })

  async function handleCreateProduct(data: CreateCustomerSchema) {
    try {
      const newCustomer = await createCustomerFn({ ...data })
      console.log({ newCustomer })
      handleUpdateCustomersCache(newCustomer)
      setOpenDialog(false)
      toast.success('Cliente cadastrado com sucesso')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response?.data.message === 'Phone already exists') {
          toast.error(`Erro ao cadastrar cliente! Telefone já em uso.`, {
            closeButton: true,
          })
        } else if (error.response?.data.message === 'Email already exists') {
          toast.error(`Erro ao cadastrar cliente! E-mail já em uso.`, {
            closeButton: true,
          })
        } else {
          toast.error(`Um erro inesperado ocorreu!`, {
            closeButton: true,
          })
        }
      } else {
        toast.error(`Um erro inesperado ocorreu!`, {
          closeButton: true,
        })
      }
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Cliente</DialogTitle>
        <DialogDescription>Crie um novo cliente</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
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
            <Button type="button" variant="ghost" disabled={isSubmitting}>
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
