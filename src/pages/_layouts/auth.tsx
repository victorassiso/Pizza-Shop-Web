import { MdDeliveryDining } from 'react-icons/md'
import { Outlet } from 'react-router-dom'

import { CreateWorkspaceWithMockDataContextProvider } from '@/contexts/create-workspace-with-mock-data-context'

export function AuthLayout() {
  return (
    <div className="flex h-screen flex-col justify-between md:grid md:grid-cols-2">
      <div className="p-[2.25rem] pb-4 md:flex md:flex-col md:justify-between md:border-r md:border-foreground/5 md:bg-muted">
        <div className="flex items-center gap-3 ">
          <MdDeliveryDining className="h-7 w-7" />
          <span className="text-lg font-semibold text-foreground">
            Delivery Shop
          </span>
        </div>

        <footer className="hidden text-sm text-muted-foreground md:block">
          Painel do parceiro &copy; delivery.shop - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="md:flex md:items-center md:justify-center ">
        <CreateWorkspaceWithMockDataContextProvider>
          <Outlet />
        </CreateWorkspaceWithMockDataContextProvider>
      </div>

      <footer className="p-4 text-center text-sm text-muted-foreground md:hidden">
        Painel do parceiro &copy; delivery.shop - {new Date().getFullYear()}
      </footer>
    </div>
  )
}
