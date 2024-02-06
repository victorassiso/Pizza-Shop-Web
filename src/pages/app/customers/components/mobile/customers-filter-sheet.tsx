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

import { CustomersFilterFormType } from '../common/customers-filter'

interface CustomersFilterSheetProps {
  handleFilter: (data: CustomersFilterFormType) => void
  handleClearFilters: () => void
}

export function CustomersFilterSheet({
  handleFilter,
  handleClearFilters,
}: CustomersFilterSheetProps) {
  const { handleSubmit, register } = useFormContext<CustomersFilterFormType>()

  return (
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
              <Label id="address" htmlFor="address">
                Endereço:
              </Label>
              <Input id="address" className="h-8" {...register('address')} />
            </div>
            <div>
              <Label id="phone" htmlFor="phone">
                Telefone:
              </Label>
              <Input id="phone" className="h-8" {...register('phone')} />
            </div>
            <div>
              <Label id="email" htmlFor="email">
                E-mail:
              </Label>
              <Input id="email" className="h-8" {...register('phone')} />
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
  )
}
