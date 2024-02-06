import { Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { CustomersFilterFormType } from '../common/customers-filter'

interface CustomersFilterRowProps {
  handleFilter: (data: CustomersFilterFormType) => void
  handleClearFilters: () => void
}

export function CustomersFilterRow({
  handleClearFilters,
  handleFilter,
}: CustomersFilterRowProps) {
  const { handleSubmit, register } = useFormContext<CustomersFilterFormType>()

  return (
    <form
      className="flex items-center gap-2"
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
  )
}
