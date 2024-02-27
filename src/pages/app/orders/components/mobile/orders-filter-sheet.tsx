import { FilterX, Search, SlidersHorizontal } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { OrdersFilterFormType } from '../common/orders-filter'

interface FilterSheetProps {
  handleFilter: (data: OrdersFilterFormType) => void
  handleClearFilters: () => void
}

export function OrdersFilterSheet({
  handleFilter,
  handleClearFilters,
}: FilterSheetProps) {
  const { handleSubmit, register, control } =
    useFormContext<OrdersFilterFormType>()

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
              <Label>ID do pedido:</Label>
              <Input
                id="orderId"
                placeholder=""
                className="h-8"
                {...register('orderId')}
              />
            </div>
            <div>
              <Label id="customerName" htmlFor="customerName">
                Nome do cliente:
              </Label>
              <Input
                id="customerName"
                placeholder=""
                className="h-8"
                {...register('customerName')}
              />
            </div>
            <Controller
              name="status"
              control={control}
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <div>
                    <Label>Status:</Label>
                    <Select
                      defaultValue="all"
                      name={name}
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="canceled">Cancelado</SelectItem>
                        <SelectItem value="processing">Em preparo</SelectItem>
                        <SelectItem value="delivering">Em entrega</SelectItem>
                        <SelectItem value="delivered">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )
              }}
            />
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
