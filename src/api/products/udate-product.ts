import { ProductDTO } from '@/@types/api-dtos'
import { api } from '@/lib/axios'

interface UpdateProductRequest {
  id: string
  name?: string
  description?: string | null
  category?: string
  price?: number
}

interface UpdateProductResponse {
  product: ProductDTO
}

export async function updateProduct({
  id,
  category,
  description,
  name,
  price,
}: UpdateProductRequest) {
  const response = await api.put<UpdateProductResponse>(`/product/${id}`, {
    category,
    description,
    name,
    price,
  })

  return response
}
