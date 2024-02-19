import { QueryKey, useQueryClient } from '@tanstack/react-query'

import { ProductDTO } from '@/@types/api-dtos'
import { Product } from '@/@types/bd-entities'
import { GetProductsResponse } from '@/api/products/get-products'

import { useProductsSearchParams } from '../params/use-products-search-params'

export function useProductsCache() {
  const queryClient = useQueryClient()
  const {
    formattedSearchParams: { name, category, description, minPrice, maxPrice },
  } = useProductsSearchParams(10)

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

  function getFilteredQueryKey(newProduct: Product) {
    const doesNewProductNameMatchesCurrentFilter =
      !name || name.includes(newProduct.name)

    const doesNewProductCategoryMatchesCurrentFilter =
      !category || category.includes(newProduct.category)

    const doesNewProductDescriptionMatchesCurrentFilter =
      !description ||
      (newProduct.description && newProduct.description.includes(description))

    const doesNewProductMaxPriceMatchesCurrentFilter =
      !maxPrice || maxPrice >= newProduct.price

    const doesNewProductMinPriceMatchesCurrentFilter =
      !minPrice || minPrice <= newProduct.price

    const filteredQueryKey = [
      'products',
      undefined, // pageIndex
      10, // perPage
      undefined, // id
      doesNewProductNameMatchesCurrentFilter ? name : undefined,
      doesNewProductCategoryMatchesCurrentFilter ? category : undefined,
      doesNewProductDescriptionMatchesCurrentFilter ? description : undefined,
      doesNewProductMinPriceMatchesCurrentFilter ? minPrice : undefined,
      doesNewProductMaxPriceMatchesCurrentFilter ? maxPrice : undefined,
    ]

    const shouldUpdateFilteredCache =
      doesNewProductNameMatchesCurrentFilter ||
      doesNewProductCategoryMatchesCurrentFilter ||
      doesNewProductDescriptionMatchesCurrentFilter ||
      doesNewProductMinPriceMatchesCurrentFilter ||
      doesNewProductMaxPriceMatchesCurrentFilter

    return { filteredQueryKey, shouldUpdateFilteredCache }
  }

  function handleUpdateFilteredCache(newProduct: Product) {
    const { filteredQueryKey, shouldUpdateFilteredCache } =
      getFilteredQueryKey(newProduct)

    if (shouldUpdateFilteredCache) {
      updateCache(filteredQueryKey, newProduct)
    }
  }

  function updateEmptyFilterCache(newProduct: Product) {
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

    updateCache(emptyFilterQueryKey, newProduct)
  }

  function handleUpdateProductsCache(newProduct: Product) {
    handleUpdateFilteredCache(newProduct)
    updateEmptyFilterCache(newProduct)
  }

  return { handleUpdateProductsCache }
}
