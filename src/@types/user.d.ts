export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role: $Enums.Role | null
  workspaceId: string | null
  createdAt: Date
  updatedAt: Date
}
