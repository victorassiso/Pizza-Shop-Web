import { QueryKey, useQueryClient } from '@tanstack/react-query'

import { ProductDTO } from '@/@types/api-dtos'
import { Product } from '@/@types/bd-entities'
import { GetProductsResponse } from '@/api/products/get-products'

import { useProductsSearchParams } from '../params/use-products-search-params'

export function useProductsCache() {
  const queryClient = useQueryClient()
  const { formattedSearchParams: params } = useProductsSearchParams(10)

  function sortProducts(a: ProductDTO, b: ProductDTO) {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()

    return nameA.localeCompare(nameB, 'pt-BR', { sensitivity: 'base' })
  }

  function updateCache(queryKey: QueryKey, newProduct: Product) {
    const cached = queryClient.getQueryData<GetProductsResponse>(queryKey)

    if (!cached) {
      return
    }

    const updatedProducts = [newProduct, ...cached.products] // Include new product
    updatedProducts.sort(sortProducts) // Sort it
    const sortedTrimmedUpdatedProducts = updatedProducts.slice(0, 10) // Get first 10 elements

    queryClient.setQueryData<GetProductsResponse>(queryKey, {
      ...cached,
      products: sortedTrimmedUpdatedProducts,
    })
  }

  function getQueryKeys(newProduct: Product) {
    const doesNewProductNameMatchesCurrentFilter =
      !params.name || newProduct.name.includes(params.name)

    const doesNewProductCategoryMatchesCurrentFilter =
      !params.category || newProduct.category.includes(params.category)

    const doesNewProductDescriptionMatchesCurrentFilter =
      !params.description ||
      (newProduct.description &&
        newProduct.description.includes(params.description))

    const doesNewProductMaxPriceMatchesCurrentFilter =
      !params.maxPrice || params.maxPrice >= newProduct.price

    const doesNewProductMinPriceMatchesCurrentFilter =
      !params.minPrice || params.minPrice <= newProduct.price

    const filteredQueryKey = [
      'products',
      undefined, // pageIndex
      10, // perPage
      undefined, // id
      doesNewProductNameMatchesCurrentFilter ? params.name : undefined,
      doesNewProductCategoryMatchesCurrentFilter ? params.category : undefined,
      doesNewProductDescriptionMatchesCurrentFilter
        ? params.description
        : undefined,
      doesNewProductMinPriceMatchesCurrentFilter ? params.minPrice : undefined,
      doesNewProductMaxPriceMatchesCurrentFilter ? params.maxPrice : undefined,
    ]

    const emptyFilterQueryKey = [
      'products',
      undefined, // pageIndex
      10, // perPage
      undefined, // id
      undefined, // name
      undefined, // category
      undefined, // description
      undefined, // minPrice
      undefined, // maxPrice
    ]

    const shouldUpdateFilteredCache =
      (doesNewProductNameMatchesCurrentFilter ||
        doesNewProductCategoryMatchesCurrentFilter ||
        doesNewProductDescriptionMatchesCurrentFilter ||
        doesNewProductMinPriceMatchesCurrentFilter ||
        doesNewProductMaxPriceMatchesCurrentFilter) &&
      JSON.stringify(filteredQueryKey) !== JSON.stringify(emptyFilterQueryKey)

    return { emptyFilterQueryKey, filteredQueryKey, shouldUpdateFilteredCache }
  }

  function handleUpdateProductsCache(newProduct: Product) {
    const { emptyFilterQueryKey, filteredQueryKey, shouldUpdateFilteredCache } =
      getQueryKeys(newProduct)

    updateCache(emptyFilterQueryKey, newProduct)

    if (shouldUpdateFilteredCache) {
      updateCache(filteredQueryKey, newProduct)
    }
  }

  return { handleUpdateProductsCache }
}
