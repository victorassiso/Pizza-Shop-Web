import { Building, ChevronDown, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          Pizza Shop
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Victor Assis</span>
          <span className="text-xs font-normal text-muted-foreground">
            victor_assis@poli.ufrj.br
          </span>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Building className="mr-2 h-4 w-4" />
            <span>Perfil da Loja</span>
          </DropdownMenuItem>
          <Link to="/sign-in">
            <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
