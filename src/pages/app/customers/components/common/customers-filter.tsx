import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { useScreenSize } from '@/hooks/use-screen-size'

import { CustomersFilterRow } from '../desktop/customers-filter-row'
import { CustomersFilterSheet } from '../mobile/customers-filter-sheet'

const CustomersFilterFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export type CustomersFilterFormType = z.infer<typeof CustomersFilterFormSchema>

export function CustomersFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { screenWidth } = useScreenSize()

  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const phone = searchParams.get('phone')
  const address = searchParams.get('address')

  const customersFilterFormMethods = useForm<CustomersFilterFormType>({
    resolver: zodResolver(CustomersFilterFormSchema),
    defaultValues: {
      id: id ?? '',
      name: name ?? '',
      email: email ?? '',
      phone: phone ?? '',
      address: address ?? '',
    },
  })
  const { reset } = customersFilterFormMethods

  function handleFilter({
    id,
    name,
    phone,
    email,
    address,
  }: CustomersFilterFormType) {
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
    <FormProvider {...customersFilterFormMethods}>
      {screenWidth <= 1400 ? (
        <CustomersFilterSheet
          handleClearFilters={handleClearFilters}
          handleFilter={handleFilter}
        />
      ) : (
        <CustomersFilterRow
          handleClearFilters={handleClearFilters}
          handleFilter={handleFilter}
        />
      )}
    </FormProvider>
  )
}
