import { OrderStatus, Role } from './bd-entities'

export interface UserDTO {
  id: string
  name: string
  email: string
  role: Role | null
  createdAt: Date
  workspaceId: string | null
}

export interface WorkspaceDTO {
  id: string
  name: string
  code: string
  createdAt: Date
}

export interface ProductDTO {
  id: string
  name: string
  description?: string
  category: string
  price: number
  createdAt: Date
}

export interface OrderDTO {
  id: string
  total: number
  status: OrderStatus
  customerName: string
  createdAt: Date
}

export interface OrderItemDTO {
  id: string
  price: number
  quantity: number
  product: {
    name: string
  }
}

export interface OrderDetailsDTO {
  id: string
  status: OrderStatus
  total: number
  customer: {
    name: string
    email: string
    phone: string
  }
  orderItems: OrderItemDTO[]
  createdAt: Date
}

export interface CustomerDTO {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: Date
}

export interface PaginationMeta {
  pageIndex: number
  perPage: number
  totalCount: number
}
