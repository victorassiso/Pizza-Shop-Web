import { Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { ProductsFilterFormType } from '../common/products-filter'

interface ProductsFilterRowProps {
  handleFilter: (data: ProductsFilterFormType) => void
  handleClearFilters: () => void
}

export function ProductsFilterRow({
  handleFilter,
  handleClearFilters,
}: ProductsFilterRowProps) {
  const { handleSubmit, register } = useFormContext()

  return (
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
  )
}
