import { createContext, ReactNode, useState } from 'react'

import { Customer } from '@/api/customers/get-customers'
import { Product } from '@/api/products/get-products'

interface Item {
  product: Product
  quantity: number
}

interface CreateOrderContextProps {
  customer: Customer | null
  items: Item[]
  preSelectedProduct: Product | null
  submitPreSelectedProduct: () => void
  updateItem: (item: Item) => void
  updateCustomer: (customer: Customer | null) => void
  preSelectProduct: (product: Product | null) => void
  removeItem: (productId: string) => void
  clearItems: () => void
}

export const createOrderContext = createContext({} as CreateOrderContextProps)

interface CreateOrderContextProviderProps {
  children: ReactNode
}

export function CreateOrderContextProvider({
  children,
}: CreateOrderContextProviderProps) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [preSelectedProduct, setPreSelectedProduct] = useState<Product | null>(
    null,
  )

  function preSelectProduct(product: Product | null) {
    setPreSelectedProduct(product)
  }

  function submitPreSelectedProduct() {
    if (preSelectedProduct) {
      let itemAleadyExists = false

      const newItems = items.map((item) => {
        if (item.product.id === preSelectedProduct.id) {
          itemAleadyExists = true
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }

        return item
      })

      if (itemAleadyExists) {
        setItems(newItems)
      } else {
        setItems([
          ...items,
          {
            product: preSelectedProduct,
            quantity: 1,
          },
        ])
      }
    }
  }

  function updateItem({ product, quantity }: Item) {
    const updatedItems = items.map((item) => {
      if (item.product.id === product.id) {
        return { product, quantity }
      }

      return item
    })

    setItems(updatedItems)
  }

  function removeItem(productId: string) {
    const updatedItems = items.filter((item) => item.product.id !== productId)

    setItems(updatedItems)
  }

  function clearItems() {
    setItems([])
  }

  function updateCustomer(customer: Customer | null) {
    setCustomer(customer)
  }

  // console.log(customerId)
  // console.log({ items })
  // console.log(preSelectedProduct)

  return (
    <createOrderContext.Provider
      value={{
        customer,
        items,
        submitPreSelectedProduct,
        updateItem,
        updateCustomer,
        preSelectedProduct,
        preSelectProduct,
        removeItem,
        clearItems,
      }}
    >
      {children}
    </createOrderContext.Provider>
  )
}
