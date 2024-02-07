import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateProduct } from '@/api/products/udate-product'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const updateProductFormSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional().nullable(),
  price: z.coerce.number().min(0),
})

type updateProductFormType = z.infer<typeof updateProductFormSchema>

interface UpdateProductDialog {
  id: string
  name: string
  description?: string | null
  category: string
  price: number
}

export function UpdateProductDialog({
  id,
  name,
  description,
  category,
  price,
}: UpdateProductDialog) {
  const { register, handleSubmit } = useForm<updateProductFormType>({
    resolver: zodResolver(updateProductFormSchema),
    defaultValues: {
      name,
      description,
      category,
      price,
    },
  })

  const { mutateAsync: updateProductFn, isPending: IsUpdatingProduct } =
    useMutation({
      mutationFn: updateProduct,
      onSuccess: () => {
        toast.success('O produto foi atualizado com sucesso!')
      },
      onError: () => {
        toast.error('Não foi possível atualizar o produto!')
      },
    })

  function handleUpdateProduct(data: updateProductFormType) {
    updateProductFn({
      id,
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
    })
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edição</DialogTitle>
        <DialogDescription>Edite um produto</DialogDescription>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Nome
              </Label>
              <Input
                className="col-span-3"
                id="name"
                {...register('name')}
                disabled={IsUpdatingProduct}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="category">
                Categoria
              </Label>
              <Input
                className="col-span-3"
                id="category"
                {...register('category')}
                disabled={IsUpdatingProduct}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="description">
                Descrição
              </Label>
              <Textarea
                className="col-span-3"
                id="description"
                {...register('description')}
                disabled={IsUpdatingProduct}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="price">
                Preço
              </Label>
              <Input
                className="col-span-3"
                id="price"
                step="0.01"
                type="number"
                {...register('price', { valueAsNumber: true })}
                disabled={IsUpdatingProduct}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                disabled={IsUpdatingProduct}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="success"
              disabled={IsUpdatingProduct}
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogHeader>
    </>
  )
}
