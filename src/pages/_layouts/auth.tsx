import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex h-screen flex-col items-center justify-center antialiased md:grid md:grid-cols-2">
      <div className="flex justify-center md:h-full md:flex-col md:justify-between md:border-r md:border-foreground/5 md:bg-muted md:p-10 md:text-muted-foreground">
        <div className="absolute left-8 top-8 flex items-center gap-3 text-lg text-foreground">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">pizza.shop</span>
        </div>

        <footer className="absolute bottom-2 w-full text-center text-sm">
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col justify-between md:relative">
        <Outlet />
      </div>
    </div>
  )
}
