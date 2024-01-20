// import { useMutation } from '@tanstack/react-query'
// import { Helmet } from 'react-helmet-async'
// import { useForm } from 'react-hook-form'
// import { Link, useNavigate, useSearchParams } from 'react-router-dom'
// import { toast } from 'sonner'
// import { z } from 'zod'

// import { signIn } from '@/api/sign-in'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

// const EnterBusinessFormSchema = z.object({
//   businessCode: z.string().email(),
// })

// type EnterBusinessFormType = z.infer<typeof EnterBusinessFormSchema>

// export function SignIn() {
//   const navigate = useNavigate()

//   const [searchParams] = useSearchParams()

//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<EnterBusinessFormType>()

//   const { mutateAsync: signInFn } = useMutation({
//     mutationFn: signIn,
//   })

//   async function handleSignIn(data: SignInForm) {
//     try {
//       await signInFn({ email: data.email, password: data.password })
//       navigate('/')
//     } catch (error) {
//       toast.error('Credenciais inválidas.')
//     }
//   }

//   return (
//     <>
//       <Helmet title="Login" />
//       <div className="p-8">
//         <Button variant="ghost" asChild className="absolute right-8 top-8">
//           <Link to="/sign-up" className="">
//             Novo estabelecimento
//           </Link>
//         </Button>
//         <div className="flex w-[350px] flex-col justify-center gap-6">
//           <div className="flex flex-col gap-2 text-center">
//             <h1 className="text-2xl font-semibold tracking-tight">
//               Acessar Painel
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Acompanhe suas vendas pelo painel do parceiro!
//             </p>
//             <form
//               id="form"
//               className="space-y-4"
//               onSubmit={handleSubmit(handleSignIn)}
//             >
//               <div className="space-y-2">
//                 <Label htmlFor="email">E-mail</Label>
//                 <Input id="email" type="email" {...register('email')} />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Senha</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   {...register('password')}
//                 />
//               </div>

//               <Button disabled={isSubmitting} className="w-full" type="submit">
//                 Acessar Painel
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
