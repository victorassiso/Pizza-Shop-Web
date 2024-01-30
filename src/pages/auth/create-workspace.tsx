import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'

const CreateWorkspaceFormSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
})

type CreateWorkspaceFormType = z.infer<typeof CreateWorkspaceFormSchema>

export function CreateWorkspace() {
  const navigate = useNavigate()
  const { createWorkspace } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateWorkspaceFormType>({
    resolver: zodResolver(CreateWorkspaceFormSchema),
  })

  async function handleCreateWorkspace(data: CreateWorkspaceFormType) {
    try {
      await createWorkspace({
        name: data.name,
        code: data.code,
      })
      navigate('/', { replace: true })
    } catch (error) {
      toast.error('Erro ao cadastrar organização.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/join-in-workspace" className="">
            Entrar em uma organização
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar uma nova organização
            </h1>
            <p className="text-sm text-muted-foreground">
              Crie um ambiente de trabalho comum para você e seus colegas de
              equipe
            </p>
            <form
              id="form"
              className="space-y-4"
              onSubmit={handleSubmit(handleCreateWorkspace)}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nome da organização</Label>
                <Input id="name" type="text" {...register('name')} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Código único da organização</Label>
                <Input id="code" type="text" {...register('code')} required />
              </div>

              <p className="text-sm text-muted-foreground">
                O código da organização é exclusivo e deve ser compartilhado com
                seus colegas de equipe, permitindo que eles participem do
                ambiente que você criou.
              </p>

              <Button disabled={isSubmitting} className="w-full" type="submit">
                Cadastrar Organização
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
