import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { createOrder, Order } from '@/api/orders/create-order'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CreateOrderContextProvider } from '@/contexts/create-order-context'

import { CreateOrderSchema } from '../orders'

interface CreateOrderDialogProps {
  handleOpenDialog: (open: boolean) => void
}

export function CreateOrderDialog({
  handleOpenDialog,
}: CreateOrderDialogProps) {
  // const { comboboxProduct, selectCoboboxProduct } =
  //   useContext(createOrderContext)
  const queryClient = useQueryClient()
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register,
  } = useFormContext<CreateOrderSchema>()

  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'items',
  })

  function updateOrdersCache(order: Order) {
    const cached = queryClient.getQueryData<Order[]>(['orders'])

    if (!cached) {
      return
    }

    queryClient.setQueryData<Order[]>(['orders'], [order, ...cached])
  }

  const { mutateAsync: createOrderFn } = useMutation({
    mutationFn: createOrder,
  })

  async function handleCreateOrder(data: any) {
    console.log(data)
    // try {
    //   const newOrder = await createOrderFn({
    //     customerId: data.customerId,
    //     items: data.items.map((item: any) => {
    //       return {
    //         productId: item.product.id,
    //         quantity: item.quantity,
    //       }
    //     }),
    //   })
    //   updateOrdersCache(newOrder)
    //   handleOpenDialog(false)
    //   toast.success('Pedido cadastrado com sucesso')
    // } catch (error) {
    //   console.log(error)
    //   toast.error('Erro ao cadastrar pedido')
    // }
  }

  function addItem() {
    append({
      product: {
        id: '',
        name: '',
        price: 0,
      },
      quantity: 0,
    })
  }

  function removeItem(index: number) {
    remove(index)
  }

  console.log({ errors })

  return (
    <CreateOrderContextProvider>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Pedido</DialogTitle>
          <DialogDescription>Crie um novo pedido</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateOrder)}>
          <div className="space-y-10 py-4">
            <div>
              <div className="ml-4 flex items-center gap-4">
                <Label className="text-right" htmlFor="customerName">
                  Cliente
                </Label>
                <Input id="customerName" {...register('customerName')} />
              </div>
              <div className="mt-4 flex justify-center">
                {errors.customerName && (
                  <span>{errors.customerName.message}</span>
                )}
              </div>
            </div>
            <div className="ml-4 flex items-center justify-between">
              <Label className="text-right" htmlFor="customerName">
                Itens
              </Label>
              <Button type="button" variant="secondary" onClick={addItem}>
                Adicionar
              </Button>
            </div>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/6">Produto</TableHead>
                  <TableHead className="w-1/6 text-right">Qtd.</TableHead>
                  <TableHead className="w-1/6 text-right">Preço</TableHead>
                  <TableHead className="w-1/6 text-right">Subtotal</TableHead>
                  <TableHead className="w-1/6 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => {
                  return (
                    <TableRow key={item.id}>
                      <>
                        <TableCell className="w-2/6">
                          <Input {...register(`items.${index}.product.name`)} />
                        </TableCell>
                        <TableCell className="w-1/6 text-right">
                          <Input
                            {...register(`items.${index}.quantity`, {
                              valueAsNumber: true,
                            })}
                            type="number"
                          />
                        </TableCell>
                        <TableCell className="w-1/6 text-right">
                          R$ 100,00
                        </TableCell>
                        <TableCell className="w-1/6 text-right">
                          R$ 100,00
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeItem(index)}
                          >
                            <Trash size={18} />
                          </Button>
                        </TableCell>
                        <div className="mt-4 flex justify-center">
                          {errors.items?.[index] && (
                            <span>{errors.items[index]?.message}</span>
                          )}
                        </div>
                      </>
                    </TableRow>
                  )
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total do pedido</TableCell>
                  <TableCell className="w-1/6 text-right font-medium">
                    R$ 1.000,00
                  </TableCell>
                  <TableCell className="w-1/6"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={() => reset()}>
                Cancelar
              </Button>
            </DialogClose>
            <Button variant="success">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </CreateOrderContextProvider>
  )
}
