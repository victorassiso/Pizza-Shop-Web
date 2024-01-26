import { createContext, ReactNode, useState } from 'react'

import { Product } from '@/api/products/get-products'

interface CreateOrderContextProps {
  comboboxProduct: Product | null
  selectCoboboxProduct: (product: Product | null) => void
}

export const createOrderContext = createContext({} as CreateOrderContextProps)

interface CreateOrderContextProviderProps {
  children: ReactNode
}

export function CreateOrderContextProvider({
  children,
}: CreateOrderContextProviderProps) {
  const [comboboxProduct, setComboboxProduct] = useState<Product | null>(null)

  function selectCoboboxProduct(product: Product | null) {
    setComboboxProduct(product)
  }

  return (
    <createOrderContext.Provider
      value={{
        comboboxProduct,
        selectCoboboxProduct,
      }}
    >
      {children}
    </createOrderContext.Provider>
  )
}
