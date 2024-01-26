import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createProduct } from '@/api/products/create-product'
import { Product } from '@/api/products/get-products'
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

interface CreateProductDialogProps {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateProductDialog({
  setOpenDialog,
}: CreateProductDialogProps) {
  const createProductSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    category: z.string().min(1),
    price: z.number(),
  })

  type CreateProductSchema = z.infer<typeof createProductSchema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  })

  const queryClient = useQueryClient()

  function updateProductsCache(product: Product) {
    const cached = queryClient.getQueryData<Product[]>(['products'])

    if (!cached) {
      return
    }

    queryClient.setQueryData<Product[]>(['products'], [product, ...cached])
  }

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
  })

  async function handleCreateProdct(data: CreateProductSchema) {
    try {
      const newProduct = await createProductFn({
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
      })
      updateProductsCache(newProduct)
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
            <Label className="text-right" htmlFor="category">
              Categoria
            </Label>
            <Input
              className="col-span-3"
              id="category"
              {...register('category')}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
