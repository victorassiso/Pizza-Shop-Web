import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { isApiError } from '@/lib/axios'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { signIn } = useAuth()
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      })
      window.location.replace('/')
    } catch (error) {
      if (
        isApiError(error) &&
        error.response?.data.message === 'Invalid credentials'
      ) {
        toast.error('Credenciais inválidas.')
      } else {
        toast.error(
          'Ops... Um erro interno ocorreu! Aguarde alguns instantes e tente novamente.',
        )
      }
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up" className="">
            Nova conta
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
            <form
              id="form"
              className="space-y-4"
              onSubmit={handleSubmit(handleSignIn)}
            >
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" {...register('email')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
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
