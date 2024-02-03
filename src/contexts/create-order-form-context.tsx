import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, ReactNode } from 'react'
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { z } from 'zod'

export const CreateOrderSchema = z.object({
  customerId: z
    .string({
      errorMap: () => ({ message: 'O cliente é obrigatório' }),
    })
    .min(1),
  customerName: z.string().min(1),
  items: z
    .array(
      z.object({
        product: z.object({
          name: z.string().min(1),
          id: z.string(),
          price: z.coerce.number(),
        }),
        quantity: z.coerce.number(),
        subtotal: z.coerce.number(),
      }),
    )
    .min(1),
  total: z.coerce.number(),
})

export type CreateOrderType = z.infer<typeof CreateOrderSchema>

interface CreateOrderFormContextProps {
  formMethods: UseFormReturn<CreateOrderType>
  fieldArrayMethods: UseFieldArrayReturn<CreateOrderType>
}

export const CreateOrderFormContext = createContext(
  {} as CreateOrderFormContextProps,
)

export interface CreateOrderFormProvierProps {
  children: ReactNode
}

export function CreateOrderFormProvider({
  children,
}: CreateOrderFormProvierProps) {
  const formMethods = useForm<CreateOrderType>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      customerId: '',
      customerName: '',
      items: [],
      total: 0,
    },
  })
  const { control } = formMethods

  const fieldArrayMethods = useFieldArray({
    control,
    name: 'items',
  })
  return (
    <CreateOrderFormContext.Provider
      value={{
        fieldArrayMethods,
        formMethods,
      }}
    >
      {children}
    </CreateOrderFormContext.Provider>
  )
}
