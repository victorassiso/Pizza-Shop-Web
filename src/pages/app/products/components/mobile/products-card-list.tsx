import { GetProductsResponse } from '@/api/products/get-products'

import { ProductsCard } from './products-card'
import { ProductsCardListSkeleton } from './products-card-list-skeleton'

interface ProductsTableProps {
  response?: GetProductsResponse
  isLoadingProducts: boolean
}

export function ProductsCardList({
  response,
  isLoadingProducts,
}: ProductsTableProps) {
  return (
    <>
      {isLoadingProducts && <ProductsCardListSkeleton />}
      {response &&
        response.products.map((product) => {
          return (
            <ProductsCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              description={product.description}
              price={product.price}
            />
          )
        })}
    </>
  )
}
