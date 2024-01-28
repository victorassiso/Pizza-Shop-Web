import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { DropdownMenuItem } from './ui/dropdown-menu'

export interface DropdownMenuItemLinkProps {
  children: ReactNode
  to: string
}

export function DropdownMenuItemLink({
  children,
  to,
}: DropdownMenuItemLinkProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <DropdownMenuItem
      data-current={pathname === to}
      className=" flex w-full cursor-pointer items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
      onClick={() => {
        navigate(to)
      }}
    >
      {children}
    </DropdownMenuItem>
  )
}
