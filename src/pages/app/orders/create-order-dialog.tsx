// import { zodResolver } from '@hookform/resolvers/zod'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'
// import { z } from 'zod'

// import { createOrder, Order } from '@/api/orders/create-order'
// import { Button } from '@/components/ui/button'
// import {
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'

// interface CreateOrderDialogProps {
//   setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
// }

// export function CreateOrderDialog({ setOpenDialog }: CreateOrderDialogProps) {
//   const createOrderSchema = z.object({
//     customerName: z.string(),
//     items: z.array(
//       z.object({
//         productName: z.string(),
//         quantity: z.string(),
//       }),
//     ),
//   })

//   type CreateOrderSchema = z.infer<typeof createOrderSchema>

//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<CreateOrderSchema>({
//     resolver: zodResolver(createOrderSchema),
//   })

//   const queryClient = useQueryClient()

//   function updateOrdersCache(order: Order) {
//     const cached = queryClient.getQueryData<Order[]>(['orders'])

//     if (!cached) {
//       return
//     }

//     queryClient.setQueryData<Order[]>(['orders'], [...cached, order])
//   }

//   const { mutateAsync: createOrderFn } = useMutation({
//     mutationFn: createOrder,
//   })

//   async function handleCreateProdct(data: CreateOrderSchema) {

//     try {
//       const newOrder = await createOrderFn({
//         customerId: data.,
//         items: data.items,
//       })
//       updateOrdersCache(newOrder)
//       setOpenDialog(false)
//       toast.success('Produto cadastrado com sucesso')
//     } catch {
//       toast.error('Erro ao cadastrar produto')
//     }
//   }

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Novo Produto</DialogTitle>
//         <DialogDescription>Crie um novo produto</DialogDescription>
//       </DialogHeader>
//       <form onSubmit={handleSubmit(handleCreateProdct)}>
//         <div className="space-y-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label className="text-right" htmlFor="name">
//               Nome
//             </Label>
//             <Input
//               className="col-span-3"
//               id="name"
//               {...register('name')}
//               disabled={isSubmitting}
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label className="text-right" htmlFor="category">
//               Categoria
//             </Label>
//             <Input
//               className="col-span-3"
//               id="category"
//               {...register('category')}
//               disabled={isSubmitting}
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label className="text-right" htmlFor="description">
//               Descrição
//             </Label>
//             <Textarea
//               className="col-span-3"
//               id="description"
//               {...register('description')}
//               disabled={isSubmitting}
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label className="text-right" htmlFor="price">
//               Preço
//             </Label>
//             <Input
//               className="col-span-3"
//               id="price"
//               step="0.01"
//               type="number"
//               {...register('price', { valueAsNumber: true })}
//               disabled={isSubmitting}
//             />
//           </div>
//         </div>

//         <DialogFooter>
//           <DialogClose asChild>
//             <Button type="button" variant="ghost">
//               Cancelar
//             </Button>
//           </DialogClose>
//           <Button type="submit" variant="success" disabled={isSubmitting}>
//             Salvar
//           </Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   )
// }
