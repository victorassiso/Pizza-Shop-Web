import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { joinInWorkspace } from '@/api/workspaces/join-in-workspace'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const JoinInWorkspaceFormSchema = z.object({
  workspaceCode: z.string(),
})

type JoinInWorkspaceFormType = z.infer<typeof JoinInWorkspaceFormSchema>

export function JoinInWorkspace() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<JoinInWorkspaceFormType>({
    resolver: zodResolver(JoinInWorkspaceFormSchema),
  })

  const { mutateAsync: joinInWorkspaceFn } = useMutation({
    mutationFn: joinInWorkspace,
  })

  async function handleJoinInWorkspace(data: JoinInWorkspaceFormType) {
    try {
      await joinInWorkspaceFn({ code: data.workspaceCode })
      navigate('/')
    } catch (error) {
      toast.error('Essa organização não existe.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/create-workspace" className="">
            Nova Organização
          </Link>
        </Button>
        <div className="justify-cJoinIn flex w-[350px] flex-col gap-6">
          <div className="text-cJoinIn flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Entrar em uma organização
            </h1>
            <p className="text-sm text-muted-foreground">
              Entre em uma organização já existente
            </p>
            <form
              id="form"
              className="space-y-4"
              onSubmit={handleSubmit(handleJoinInWorkspace)}
            >
              <div className="space-y-2">
                <Label htmlFor="workspaceCode">Código da organização</Label>
                <Input
                  id="workspaceCode"
                  type="text"
                  {...register('workspaceCode')}
                />
              </div>

              <Button disabled={isSubmitting} className="w-full" type="submit">
                Acessar Painel
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
