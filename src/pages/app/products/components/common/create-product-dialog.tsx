import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { Product } from '@/@types/bd-entities'
import { createProduct } from '@/api/products/create-product'
import { GetProductsResponse } from '@/api/products/get-products'
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
import { useProductsSearchParams } from '@/hooks/params/use-products-search-params'

import { CreateProductFormType } from './products-header'

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

  const {
    formattedSearchParams: { name, category, description, minPrice, maxPrice },
  } = useProductsSearchParams(10)

  function updateProductsCache(newProduct: Product) {
    const doesNewProductNameMatchesCurrentFilter =
      !name || name.includes(newProduct.name)

    const doesNewProductCategoryMatchesCurrentFilter =
      !category || category.includes(newProduct.category)

    const doesNewProductDescriptionMatchesCurrentFilter =
      !description ||
      (newProduct.description && newProduct.description.includes(description))

    const doesNewProductMaxPriceMatchesCurrentFilter =
      !maxPrice || maxPrice >= newProduct.price

    const doesNewProductMinPriceMatchesCurrentFilter =
      !minPrice || minPrice <= newProduct.price

    const filteredQueryKey = [
      'products',
      undefined, // pageIndex
      10, // perPage
      undefined, // id
      doesNewProductNameMatchesCurrentFilter ? name : undefined,
      doesNewProductCategoryMatchesCurrentFilter ? category : undefined,
      doesNewProductDescriptionMatchesCurrentFilter ? description : undefined,
      doesNewProductMinPriceMatchesCurrentFilter ? minPrice : undefined,
      doesNewProductMaxPriceMatchesCurrentFilter ? maxPrice : undefined,
    ]

    const emptyFilterQueryKey = [
      'products',
      undefined, // pageIndex
      undefined, // perPage
      undefined, // id
      undefined, // name
      undefined, // category
      undefined, // description
      undefined, // minPrice
      undefined, // maxPrice
    ]

    // Update Filtered Cache
    if (
      doesNewProductNameMatchesCurrentFilter ||
      doesNewProductCategoryMatchesCurrentFilter ||
      doesNewProductDescriptionMatchesCurrentFilter ||
      doesNewProductMinPriceMatchesCurrentFilter ||
      doesNewProductMaxPriceMatchesCurrentFilter
    ) {
      const cached =
        queryClient.getQueryData<GetProductsResponse>(filteredQueryKey)

      if (!cached) {
        return
      }

      queryClient.setQueryData<GetProductsResponse>(filteredQueryKey, {
        ...cached,
        products: [newProduct, ...cached.products],
      })
    }

    // Update Empty Filter Cache
    const cached =
      queryClient.getQueryData<GetProductsResponse>(emptyFilterQueryKey)

    if (!cached) {
      return
    }

    queryClient.setQueryData<GetProductsResponse>(emptyFilterQueryKey, {
      ...cached,
      products: [newProduct, ...cached.products],
    })
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
      toast.success('Produto cadastrado com sucesso', {
        closeButton: true,
      })
    } catch {
      toast.error('Erro ao cadastrar produto', {
        closeButton: true,
      })
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
