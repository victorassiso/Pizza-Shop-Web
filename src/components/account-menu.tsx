import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut, PencilLine } from 'lucide-react'

import { getUser } from '@/api/users/get-user'
import { getWorkspace } from '@/api/workspaces/get-workspace'
import { useAuth } from '@/hooks/use-auth'

import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'
import { WorkspaceProfileDialog } from './workspace-profile-dialog'

export function AccountMenu() {
  const { signOut, isSigningOut, removeWorkspace, isRemovingWorkspace } =
    useAuth()

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
  })

  const { data: workspace, isLoading: isLoadingWorkspace } = useQuery({
    queryKey: ['workspace'],
    queryFn: getWorkspace,
    staleTime: Infinity,
  })

  async function handleSignOut() {
    try {
      await signOut()
      window.location.replace('/')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleWorkspaceRemoval() {
    try {
      await removeWorkspace()
      window.location.replace('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingWorkspace && <Skeleton className="h-4 w-40" />}
            {workspace && (
              <span className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap lg:max-w-none">
                {workspace.name}
              </span>
            )}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingUser && (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            )}{' '}
            {user && (
              <>
                <span>{user.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {user.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da Loja</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <PencilLine className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem
                asChild
                className="text-rose-500 dark:text-rose-400"
                disabled={isRemovingWorkspace}
              >
                <button
                  onClick={() => handleWorkspaceRemoval()}
                  className="w-full"
                  disabled={isRemovingWorkspace}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair da Loja</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
          >
            <button
              onClick={() => handleSignOut()}
              className="w-full"
              disabled={isSigningOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <WorkspaceProfileDialog />
      </DialogContent>
    </Dialog>
  )
}
