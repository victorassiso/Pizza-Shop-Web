import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex h-screen flex-col justify-between md:grid md:grid-cols-2">
      <div className="p-[2.25rem] pb-4 md:flex md:flex-col md:justify-between md:border-r md:border-foreground/5 md:bg-muted">
        <div className="flex items-center gap-3 ">
          <Pizza className="h-5 w-5" />
          <span className="text-lg font-semibold text-foreground">
            pizza.shop
          </span>
        </div>

        <footer className="hidden text-sm text-muted-foreground md:block">
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="md:flex md:items-center md:justify-center ">
        <Outlet />
      </div>

      <footer className="p-4 text-center text-sm text-muted-foreground md:hidden">
        Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
      </footer>
    </div>
  )
}
