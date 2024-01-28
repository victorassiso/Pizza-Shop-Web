import {
  Barcode,
  Home,
  Menu,
  Pizza,
  Users,
  UtensilsCrossed,
} from 'lucide-react'
import { useState } from 'react'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ModeToggle } from './theme/mode-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Separator } from './ui/separator'

export function Header() {
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false)

  return (
    <div className="border-r">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />

        <Separator orientation="vertical" />
        {/* Drop Down Menu */}
        <div className="lg:hidden">
          <DropdownMenu open={openDropdownMenu}>
            <DropdownMenuTrigger>
              <Menu onClick={() => setOpenDropdownMenu(!openDropdownMenu)} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-24 md:hidden">
              <NavLink
                to="/"
                className="rounded-sm p-2"
                onClick={() => setOpenDropdownMenu(!openDropdownMenu)}
              >
                <Home className="h-4 w-4" />
                Início
              </NavLink>
              <NavLink
                to="/orders"
                className="rounded-sm p-2"
                onClick={() => setOpenDropdownMenu(!openDropdownMenu)}
              >
                <Barcode className="h-4 w-4" />
                Pedidos
              </NavLink>
              <NavLink
                to="/products"
                className="rounded-sm p-2"
                onClick={() => setOpenDropdownMenu(!openDropdownMenu)}
              >
                <UtensilsCrossed className="h-4 w-4" />
                Produtos
              </NavLink>
              <NavLink
                to="/customers"
                className="rounded-sm p-2"
                onClick={() => setOpenDropdownMenu(!openDropdownMenu)}
              >
                <Users className="h-4 w-4" />
                Clientes
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Nav Bar */}
        <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
          <NavLink
            to="/"
            onClick={() => setOpenDropdownMenu(!openDropdownMenu)}
          >
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink
            to="/orders"
            onClick={() => setOpenDropdownMenu(!openDropdownMenu)}
          >
            <Barcode className="h-4 w-4" />
            Pedidos
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setOpenDropdownMenu(!openDropdownMenu)}
          >
            <UtensilsCrossed className="h-4 w-4" />
            Produtos
          </NavLink>
          <NavLink
            to="/customers"
            onClick={() => setOpenDropdownMenu(!openDropdownMenu)}
          >
            <Users className="h-4 w-4" />
            Clientes
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
