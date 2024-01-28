import { zodResolver } from '@hookform/resolvers/zod'
import { FilterX, Search, SlidersHorizontal } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

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

const OrderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilterType = z.infer<typeof OrderFilterSchema>

export function OrderFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm<OrderFilterType>({
    resolver: zodResolver(OrderFilterSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  function handleFilter({ orderId, customerName, status }: OrderFilterType) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }

      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')

      reset({
        orderId: '',
        customerName: '',
        status: 'all',
      })
      return state
    })
  }
  return (
    <>
      <div className="lg:hidden">
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
                            <SelectItem value="processing">
                              Em preparo
                            </SelectItem>
                            <SelectItem value="delivering">
                              Em entrega
                            </SelectItem>
                            <SelectItem value="delivered">Entregue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )
                  }}
                />
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
        className="hidden items-center gap-2 lg:flex"
        onSubmit={handleSubmit(handleFilter)}
      >
        <span className="text-sm font-semibold ">Filtros:</span>
        <Input
          id="orderId"
          placeholder="ID do pedido"
          className="h-8 w-auto"
          {...register('orderId')}
        />
        <Input
          id="customerName"
          placeholder="Nome do cliente"
          className="h-8 w-[320px]"
          {...register('customerName')}
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => {
            return (
              <Select
                defaultValue="all"
                name={name}
                onValueChange={onChange}
                value={value}
                disabled={disabled}
              >
                <SelectTrigger className="h-8 w-[180px]">
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
            )
          }}
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
