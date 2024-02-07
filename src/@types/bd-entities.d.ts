export enum Role {
  user = 'user',
  admin = 'admin',
}

export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role?: Role | null

  workspaceId?: string | null

  createdAt: Date
  updatedAt: Date
}

export interface Workspace {
  id: string
  name: string
  code: string

  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description?: string | null
  category: string
  price: number

  workspaceId: string

  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  total: number
  status: OrderStatus

  workspaceId: string

  customerId: string

  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string

  price: number
  quantity: number

  workspaceId: string

  productId: string

  orderId: string

  createdAt: Date
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string

  workspaceId: string

  createdAt: Date
  updatedAt: Date
}
