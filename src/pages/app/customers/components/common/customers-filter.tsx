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

const OrderFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
})

type OrderFilterType = z.infer<typeof OrderFilterSchema>

export function CustomersFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const phone = searchParams.get('phone')
  const address = searchParams.get('address')

  const { register, handleSubmit, reset } = useForm<OrderFilterType>({
    resolver: zodResolver(OrderFilterSchema),
    defaultValues: {
      id: id ?? '',
      name: name ?? '',
      email: email ?? '',
      phone: phone ?? '',
      address: address ?? '',
    },
  })

  function handleFilter({ id, name, phone, email, address }: OrderFilterType) {
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

      if (email) {
        state.set('email', email)
      } else {
        state.delete('email')
      }

      if (phone) {
        state.set('phone', phone)
      } else {
        state.delete('phone')
      }

      if (address) {
        state.set('address', address)
      } else {
        state.delete('address')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('id')
      state.delete('name')
      state.delete('address')
      state.delete('phone')
      state.delete('email')
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
                  <Label id="address" htmlFor="address">
                    Endereço:
                  </Label>
                  <Input
                    id="address"
                    className="h-8"
                    {...register('address')}
                  />
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
          id="address"
          placeholder="Endereço"
          className="h-8 w-[320px]"
          {...register('address')}
        />
        <Input
          id="email"
          placeholder="E-mail"
          className="h-8 w-[320px]"
          {...register('email')}
        />
        <Input
          id="phone"
          placeholder="Telefone"
          className="h-8 w-[320px]"
          {...register('phone')}
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
