import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { isApiError } from '@/lib/axios'

const signUpForm = z.object({
  name: z.string().min(1),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const { signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      window.location.replace('/')
    } catch (error) {
      if (
        isApiError(error) &&
        error.response?.data.message === 'E-mail already exists'
      ) {
        toast.error('E-mail já em uso!', {
          closeButton: true,
        })
      } else {
        toast.error('Erro ao cadastrar usuário.', {
          closeButton: true,
        })
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info('Na versão demo, seu e-mail não será utilizado.', {
        closeButton: true,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="flex w-full justify-center p-8">
        <Button variant="outline" asChild className="absolute right-8 top-8">
          <Link to="/sign-in" className="">
            Login
          </Link>
        </Button>
        <div className="w-full max-w-[350px]">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comecece suas vendas
            </p>
            <form
              id="form"
              className="space-y-4"
              onSubmit={handleSubmit(handleSignUp)}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" type="text" {...register('name')} />
              </div>
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
                Finalizar Cadastro
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
