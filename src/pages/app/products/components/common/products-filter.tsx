import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { useScreenSize } from '@/hooks/use-screen-size'

import { ProductsFilterRow } from '../desktop/products-filter-row'
import { ProductsFilterSheet } from '../mobile/products-filter-sheet'

const ProductsFilterFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
})

export type ProductsFilterFormType = z.infer<typeof ProductsFilterFormSchema>

export function ProductsFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { screenWidth } = useScreenSize()

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

  const productsFilterMethods = useForm<ProductsFilterFormType>({
    resolver: zodResolver(ProductsFilterFormSchema),
    defaultValues: {
      id: id ?? undefined,
      name: name ?? undefined,
      category: category ?? undefined,
      description: description ?? undefined,
      maxPrice: maxPrice ?? undefined,
      minPrice: minPrice ?? undefined,
    },
  })

  const { reset } = productsFilterMethods

  function handleFilter({
    id,
    name,
    description,
    category,
    minPrice,
    maxPrice,
  }: ProductsFilterFormType) {
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
    <FormProvider {...productsFilterMethods}>
      {screenWidth <= 1400 ? (
        <ProductsFilterSheet
          handleClearFilters={handleClearFilters}
          handleFilter={handleFilter}
        />
      ) : (
        <ProductsFilterRow
          handleClearFilters={handleClearFilters}
          handleFilter={handleFilter}
        />
      )}
    </FormProvider>
  )
}
