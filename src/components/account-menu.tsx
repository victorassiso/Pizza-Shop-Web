import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getProfile } from '@/api/users/get-profile'
import { getWorkspace } from '@/api/workspaces/get-workspace'
import { useAuth } from '@/hooks/use-auth'

import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'
import { WorkspaceProfileDialog } from './workspace-profile-dialog'

export function AccountMenu() {
  const navigate = useNavigate()
  const { signOut, isSigningOut } = useAuth()
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
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
      navigate('/', { replace: true })
    } catch (error) {
      console.log(error)
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
            {isLoadingWorkspace ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <span className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap lg:max-w-none">
                {workspace?.name}
              </span>
            )}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}

            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" />
                <span>Perfil da Loja</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              asChild
              className="text-rose-500 dark:text-rose-400"
              disabled={isSigningOut}
            >
              <button onClick={() => handleSignOut()} className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
      <WorkspaceProfileDialog />
    </Dialog>
  )
}
