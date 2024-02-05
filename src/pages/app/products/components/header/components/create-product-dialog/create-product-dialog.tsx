import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { createProduct } from '@/api/products/create-product'
import { ProductDTO } from '@/api/products/get-products'
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

import { CreateProductFormType } from '../../header'

interface CreateProductDialogProps {
  handleOpenDialog: (open: boolean) => void
}

export function CreateProductDialog({
  handleOpenDialog,
}: CreateProductDialogProps) {
  const queryClient = useQueryClient()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useFormContext<CreateProductFormType>()

  function updateProductsCache(product: ProductDTO) {
    const cached = queryClient.getQueryData<ProductDTO[]>(['products'])

    if (!cached) {
      return
    }

    queryClient.setQueryData<ProductDTO[]>(['products'], [product, ...cached])
  }

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
  })

  async function handleCreateProduct(data: CreateProductFormType) {
    try {
      const newProduct = await createProductFn({
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
      })
      updateProductsCache(newProduct)
      handleOpenDialog(false)
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
