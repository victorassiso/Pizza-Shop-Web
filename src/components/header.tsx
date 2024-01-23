import { Barcode, Home, Pizza, Users, UtensilsCrossed } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ModeToggle } from './theme/mode-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-r">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />

        <Separator orientation="vertical" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
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
