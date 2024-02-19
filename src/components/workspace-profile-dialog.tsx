import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { WorkspaceDTO } from '@/@types/api-dtos'
import { getWorkspace } from '@/api/workspaces/get-workspace'
import { updateWorkspace } from '@/api/workspaces/update-workspace'
import { isApiError } from '@/lib/axios'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function WorkspaceProfileDialog() {
  const queryClient = useQueryClient()

  const { data: workspace } = useQuery({
    queryKey: ['workspace'],
    queryFn: getWorkspace,
    staleTime: Infinity,
  })

  const WorkspaceSchema = z.object({
    name: z.string().min(1),
    code: z.string().min(3),
  })

  type WorkspaceType = z.infer<typeof WorkspaceSchema>

  function updateWorkspaceCache({ name, code }: WorkspaceType) {
    const cached = queryClient.getQueryData<WorkspaceDTO>(['workspace'])

    if (cached) {
      queryClient.setQueryData<WorkspaceDTO>(['workspace'], {
        ...cached,
        name,
        code,
      })
    }

    return { cached }
  }
  const { mutateAsync: updateWorkspaceFn, isPending } = useMutation({
    mutationFn: updateWorkspace,
    onMutate({ name, code }) {
      const { cached } = updateWorkspaceCache({ name, code })
      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateWorkspaceCache(context.previousProfile)
      }
    },
    retry(failureCount, error) {
      if (isApiError(error) && error.response?.status === 409) {
        return false
      }
      if (failureCount >= 2) {
        return false
      }

      return true
    },
  })

  async function handleUpdateWorkspace(data: WorkspaceType) {
    try {
      await updateWorkspaceFn({
        name: data.name,
        code: data.code,
      })

      toast.success('Perfil atualizado com sucesso!', {
        closeButton: true,
      })
    } catch (error) {
      if (isApiError(error) && error.response?.status === 409) {
        toast.error('Esse código já está em uso, tente outro.')
      } else {
        toast.error('Falha ao atualizar perfil, tente novamente.', {
          closeButton: true,
        })
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<WorkspaceType>({
    resolver: zodResolver(WorkspaceSchema),
    values: {
      name: workspace?.name ?? '',
      code: workspace?.code ?? '',
    },
  })

  return (
    <>
      <DialogHeader>
        <DialogTitle>Perfil da Loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateWorkspace)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3 disabled:cursor-default"
              id="name"
              {...register('name')}
              disabled={isSubmitting || isPending}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="code">
              Code
            </Label>
            <Input
              className="col-span-3 disabled:cursor-default"
              id="code"
              {...register('code')}
              disabled={isSubmitting || isPending}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              disabled={isSubmitting || isPending}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting || isPending}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}
