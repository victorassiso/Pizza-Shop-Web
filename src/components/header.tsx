import {
  Barcode,
  Home,
  Menu,
  Pizza,
  Users,
  UtensilsCrossed,
} from 'lucide-react'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { DropdownMenuItemLink } from './nav-link-menu-item'
import { ModeToggle } from './theme/mode-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="">
      <div className="flex h-16 items-center gap-6 px-6">
        <div className="hidden h-16 items-center gap-6 md:flex">
          <Pizza className="h-6 w-6" />
          <Separator orientation="vertical" />
        </div>
        {/* Drop Down Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-6 md:ml-24 md:hidden">
              <DropdownMenuItemLink to="/">
                <Home className="h-4 w-4" />
                Início
              </DropdownMenuItemLink>
              <DropdownMenuItemLink to="/orders">
                <Barcode className="h-4 w-4" />
                Pedidos
              </DropdownMenuItemLink>
              <DropdownMenuItemLink to="/products">
                <UtensilsCrossed className="h-4 w-4" />
                Produtos
              </DropdownMenuItemLink>
              <DropdownMenuItemLink to="/customers">
                <Users className="h-4 w-4" />
                Clientes
              </DropdownMenuItemLink>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Nav Bar */}
        <nav className="hidden items-center md:flex md:space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/orders">
            <Barcode className="h-4 w-4" />
            Pedidos
          </NavLink>
          <NavLink to="/products">
            <UtensilsCrossed className="h-4 w-4" />
            Produtos
          </NavLink>
          <NavLink to="/customers">
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
