import { zodResolver } from '@hookform/resolvers/zod'
import { FilterX, Search, SlidersHorizontal } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const ProductFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
})

type ProductFilterType = z.infer<typeof ProductFilterSchema>

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const category = searchParams.get('category')
  const description = searchParams.get('description')
  const minPrice = z.coerce
    .number()
    .transform((value) => value || undefined)
    .parse(searchParams.get('minPrice'))
  const maxPrice = z.coerce
    .number()
    .transform((value) => value || undefined)
    .parse(searchParams.get('maxPrice'))

  const { register, handleSubmit, reset } = useForm<ProductFilterType>({
    resolver: zodResolver(ProductFilterSchema),
    defaultValues: {
      id: id ?? undefined,
      name: name ?? undefined,
      category: category ?? undefined,
      description: description ?? undefined,
      maxPrice: maxPrice ?? undefined,
      minPrice: minPrice ?? undefined,
    },
  })

  function handleFilter({
    id,
    name,
    description,
    category,
    minPrice,
    maxPrice,
  }: ProductFilterType) {
    setSearchParams((state) => {
      if (id) {
        state.set('id', id)
      } else {
        state.delete('id')
      }

      if (name) {
        state.set('name', name)
      } else {
        state.delete('name')
      }

      if (description) {
        state.set('description', description)
      } else {
        state.delete('description')
      }

      if (category) {
        state.set('category', category)
      } else {
        state.delete('category')
      }

      if (minPrice) {
        state.set('minPrice', String(minPrice))
      } else {
        state.delete('minPrice')
      }

      if (maxPrice) {
        state.set('maxPrice', String(maxPrice))
      } else {
        state.delete('maxPrice')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('id')
      state.delete('name')
      state.delete('description')
      state.delete('category')
      state.delete('minPrice')
      state.delete('maxPrice')
      state.set('page', '1')

      reset()
      return state
    })
  }
  return (
    <>
      <div className="2xl:hidden">
        <Sheet>
          <div className="flex justify-end">
            <SheetTrigger>
              <Button variant="outline" className="">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtros:</SheetTitle>
            </SheetHeader>
            <form
              className="flex h-[calc(100%-28px)] flex-col justify-between"
              onSubmit={handleSubmit(handleFilter)}
            >
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <Label>ID:</Label>
                  <Input id="id" className="h-8" {...register('id')} />
                </div>
                <div>
                  <Label id="name" htmlFor="name">
                    Nome:
                  </Label>
                  <Input id="name" className="h-8" {...register('name')} />
                </div>
                <div>
                  <Label id="description" htmlFor="address">
                    Descrição:
                  </Label>
                  <Input
                    id="description"
                    className="h-8"
                    {...register('description')}
                  />
                </div>
                <div>
                  <Label id="category" htmlFor="category">
                    Categoria:
                  </Label>
                  <Input
                    id="category"
                    className="h-8"
                    {...register('category')}
                  />
                </div>
                <div>
                  <Label id="minPrice" htmlFor="minPrice">
                    Preço mínimo:
                  </Label>
                  <Input
                    id="minPrice"
                    className="h-8"
                    {...register('minPrice')}
                  />
                </div>
                <div>
                  <Label id="maxPrice" htmlFor="maxPrice">
                    Preço máximo:
                  </Label>
                  <Input
                    id="maxPrice"
                    className="h-8"
                    {...register('maxPrice')}
                  />
                </div>
              </div>

              <SheetFooter className="mt-6">
                <SheetClose className="flex w-full flex-col gap-4">
                  <Button
                    type="submit"
                    variant="secondary"
                    size="xs"
                    className="w-full"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Filtrar resultados
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    className="w-full"
                    onClick={handleClearFilters}
                  >
                    <FilterX className="mr-2 h-4 w-4" />
                    Remover filtros
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <form
        className="hidden items-center gap-2 2xl:flex"
        onSubmit={handleSubmit(handleFilter)}
      >
        <span className="text-sm font-semibold ">Filtros:</span>
        <Input
          id="id"
          placeholder="ID"
          className="h-8 w-auto"
          {...register('id')}
        />
        <Input
          id="name"
          placeholder="Nome"
          className="h-8 w-[320px]"
          {...register('name')}
        />
        <Input
          id="description"
          placeholder="Descrição"
          className="h-8 w-[320px]"
          {...register('description')}
        />
        <Input
          id="category"
          placeholder="Categoria"
          className="h-8 w-[320px]"
          {...register('category')}
        />
        <Input
          id="minPrice"
          placeholder="Preço mínimo"
          className="h-8 w-[120px]"
          {...register('minPrice')}
        />
        <Input
          id="maxPrice"
          placeholder="Preço máximo"
          className="h-8 w-[120px]"
          {...register('maxPrice')}
        />

        <Button type="submit" variant="secondary" size="xs">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>

        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={handleClearFilters}
        >
          <Search className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </form>
    </>
  )
}
