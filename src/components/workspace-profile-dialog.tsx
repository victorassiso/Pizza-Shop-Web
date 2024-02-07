import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { WorkspaceDTO } from '@/@types/api-dtos'
import { getWorkspace } from '@/api/workspaces/get-workspace'
import { updateWorkspace } from '@/api/workspaces/update-workspace'

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
  const { mutateAsync: updateWorkspaceFn } = useMutation({
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
    } catch {
      toast.error('Falha ao atualizar perfil, tente novamente.', {
        closeButton: true,
      })
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
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="code">
              Code
            </Label>
            <Input className="col-span-3" id="code" {...register('code')} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}
