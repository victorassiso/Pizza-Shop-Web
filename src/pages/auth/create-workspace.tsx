import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAuth } from '@/hooks/use-auth'

const CreateWorkspaceFormSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
})

type CreateWorkspaceFormType = z.infer<typeof CreateWorkspaceFormSchema>

export function CreateWorkspace() {
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
      window.location.replace('/')
    } catch (error) {
      toast.error('Erro ao cadastrar organização.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex justify-center p-8">
        <Button variant="outline" asChild className="absolute right-8 top-8">
          <Link to="/join-in-workspace" className="">
            Entrar em uma loja
          </Link>
        </Button>
        <div className="w-full max-w-[350px]">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar Loja
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
                <Label htmlFor="name">Nome da loja</Label>
                <Input id="name" type="text" {...register('name')} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 pl-7">
                  <Label htmlFor="code">Código da loja</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex h-5 w-5 items-center justify-center rounded-md border p-0 text-sm text-muted-foreground hover:cursor-default">
                          ?
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[250px]">
                          Cada loja possui um código único que deve ser
                          compartilhado entre os colaboradores para que possam
                          acessar um mesmo ambiente de trabalho.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input id="code" type="text" {...register('code')} />
              </div>

              <Button disabled={isSubmitting} className="w-full" type="submit">
                Cadastrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
