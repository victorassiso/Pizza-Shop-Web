import { GetProductsResponseData } from '@/api/products/get-products'

import { ProductCard } from './product-card'
import { ProductCardListSkeleton } from './product-card-list-skeleton'

interface ProductTableProps {
  response?: GetProductsResponseData
  isLoadingProducts: boolean
}

export function ProductCardList({
  response,
  isLoadingProducts,
}: ProductTableProps) {
  return (
    <>
      {isLoadingProducts && <ProductCardListSkeleton />}
      {response &&
        response.products.map((product) => {
          return (
            <ProductCard
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
