import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'

const JoinInWorkspaceFormSchema = z.object({
  workspaceCode: z.string(),
})

type JoinInWorkspaceFormType = z.infer<typeof JoinInWorkspaceFormSchema>

export function JoinInWorkspace() {
  const { joinInWorkspace } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<JoinInWorkspaceFormType>({
    resolver: zodResolver(JoinInWorkspaceFormSchema),
  })

  async function handleJoinInWorkspace(data: JoinInWorkspaceFormType) {
    try {
      const { workspaceId } = await joinInWorkspace({
        code: data.workspaceCode,
      })
      console.log({ workspaceId })
      window.location.replace('/')
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
                Entrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
