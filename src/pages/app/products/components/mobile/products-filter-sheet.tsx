import { FilterX, Search, SlidersHorizontal } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

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

import { ProductsFilterFormType } from '../common/products-filter'

interface FilterSheetProps {
  handleFilter: (data: ProductsFilterFormType) => void
  handleClearFilters: () => void
}

export function ProductsFilterSheet({
  handleFilter,
  handleClearFilters,
}: FilterSheetProps) {
  const { handleSubmit, register } = useFormContext<ProductsFilterFormType>()

  return (
    <Sheet>
      <div className="flex justify-end">
        <SheetTrigger asChild>
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
              <Input id="category" className="h-8" {...register('category')} />
            </div>
            <div>
              <Label id="minPrice" htmlFor="minPrice">
                Preço mínimo:
              </Label>
              <Input id="minPrice" className="h-8" {...register('minPrice')} />
            </div>
            <div>
              <Label id="maxPrice" htmlFor="maxPrice">
                Preço máximo:
              </Label>
              <Input id="maxPrice" className="h-8" {...register('maxPrice')} />
            </div>
          </div>

          <SheetFooter className="mt-6">
            <div className="flex w-full flex-col gap-4">
              <SheetClose asChild>
                <Button
                  type="submit"
                  variant="secondary"
                  size="xs"
                  className="w-full"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Filtrar resultados
                </Button>
              </SheetClose>

              <SheetClose asChild>
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
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
