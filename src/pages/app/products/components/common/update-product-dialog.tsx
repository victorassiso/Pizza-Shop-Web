import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ProductDTO } from '@/@types/api-dtos'
import { GetProductsResponse } from '@/api/products/get-products'
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
import { useProductsSearchParams } from '@/hooks/params/use-products-search-params'

const updateProductFormSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
})

type updateProductFormType = z.infer<typeof updateProductFormSchema>

interface UpdateProductDialog {
  id: string
  name: string
  description?: string
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
  const queryClient = useQueryClient()
  const { formattedSearchParams } = useProductsSearchParams(10)
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
      onSuccess({ data }) {
        updateProductsCache({
          id,
          name: data.product.name,
          description: data.product.description,
          category: data.product.category,
          price: data.product.price,
        })
        toast.success('O produto foi atualizado com sucesso!', {
          closeButton: true,
        })
      },
      onError: () => {
        toast.error('Não foi possível atualizar o produto!', {
          closeButton: true,
        })
      },
      retry: 3,
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

  function updateProductsCache(updatedProduct: ProductDTO) {
    const doesNewProductNameMatchesCurrentFilter =
      !formattedSearchParams.name ||
      formattedSearchParams.name.includes(updatedProduct.name)

    const doesNewProductCategoryMatchesCurrentFilter =
      !formattedSearchParams.category ||
      formattedSearchParams.category.includes(updatedProduct.category)

    const doesNewProductDescriptionMatchesCurrentFilter =
      !formattedSearchParams.description ||
      (updatedProduct.description &&
        updatedProduct.description.includes(formattedSearchParams.description))

    const doesNewProductMaxPriceMatchesCurrentFilter =
      !formattedSearchParams.maxPrice ||
      formattedSearchParams.maxPrice >= updatedProduct.price

    const doesNewProductMinPriceMatchesCurrentFilter =
      !formattedSearchParams.minPrice ||
      formattedSearchParams.minPrice <= updatedProduct.price

    const filteredQueryKey = [
      'products',
      formattedSearchParams.pageIndex, // pageIndex
      10, // perPage
      undefined, // id
      doesNewProductNameMatchesCurrentFilter
        ? formattedSearchParams.name
        : undefined,
      doesNewProductCategoryMatchesCurrentFilter
        ? formattedSearchParams.category
        : undefined,
      doesNewProductDescriptionMatchesCurrentFilter
        ? formattedSearchParams.description
        : undefined,
      doesNewProductMinPriceMatchesCurrentFilter
        ? formattedSearchParams.minPrice
        : undefined,
      doesNewProductMaxPriceMatchesCurrentFilter
        ? formattedSearchParams.maxPrice
        : undefined,
    ]

    const emptyFilterQueryKey = [
      'products',
      formattedSearchParams.pageIndex, // pageIndex
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

      const updatedProducts = cached.products.map((item) => {
        if (item.id === id) {
          return updatedProduct
        }

        return item
      })

      queryClient.setQueryData<GetProductsResponse>(filteredQueryKey, {
        ...cached,
        products: updatedProducts,
      })
    }

    // Update Empty Filter Cache
    const cached =
      queryClient.getQueryData<GetProductsResponse>(emptyFilterQueryKey)

    if (!cached) {
      return
    }

    const updatedProducts = cached.products.map((item) => {
      if (item.id === id) {
        return updatedProduct
      }

      return item
    })

    queryClient.setQueryData<GetProductsResponse>(emptyFilterQueryKey, {
      ...cached,
      products: updatedProducts,
    })
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Edite <span className="text-primary">{name}</span>
        </DialogTitle>
        <DialogDescription>ID: {id}</DialogDescription>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Nome
              </Label>
              <Input
                className="col-span-3 disabled:cursor-default"
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
                className="col-span-3 disabled:cursor-default"
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
                className="col-span-3 disabled:cursor-default"
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
                className="col-span-3 disabled:cursor-default"
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
