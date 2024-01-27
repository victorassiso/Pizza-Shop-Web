import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { createOrder, Order } from '@/api/orders/create-order'
import { GetOrdersResponse } from '@/api/orders/get-orders'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { CustomersCombobox } from './customers-combobox'
import { Item } from './item'

interface CreateOrderDialogProps {
  handleOpenDialog: (open: boolean) => void
}

export function CreateOrderDialog({
  handleOpenDialog,
}: CreateOrderDialogProps) {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
  } = useFormContext<CreateOrderSchema>()
  const watchedItems = watch('items')
  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'items',
  })

  const queryClient = useQueryClient()

  function updateOrdersCache(order: Order, customerName: string) {
    console.log(order)
    const cached = queryClient.getQueryData<GetOrdersResponse>([
      'orders',
      0, // pageIndex
      null, // orderId
      null, // customerName
      null, // status
    ])
    console.log(cached)
    if (!cached) {
      return
    }
    console.log(cached)

    queryClient.setQueryData<GetOrdersResponse>(
      [
        'orders',
        0, // pageIndex
        null, // orderId
        null, // customerName
        null, // status
      ],
      {
        ...cached,
        orders: [
          {
            orderId: order.id,
            createdAt: order.createdAt,
            status: order.status,
            customerName,
            total: order.total,
          },
          ...cached.orders,
        ],
      },
    )
  }

  const { mutateAsync: createOrderFn } = useMutation({
    mutationFn: createOrder,
  })

  async function handleCreateOrder(data: CreateOrderSchema) {
    console.log(data)
    try {
      const response = await createOrderFn({
        customerId: data.customerId,
        items: data.items.map((item) => {
          return {
            productId: item.product.id,
            quantity: item.quantity,
          }
        }),
      })
      console.log(response)
      updateOrdersCache(response, data.customerName)
      handleOpenDialog(false)
      toast.success('Pedido cadastrado com sucesso')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao cadastrar pedido')
    }
  }

  function addItem() {
    append({
      product: {
        id: '',
        name: '',
        price: 0,
      },
      quantity: 0,
      subtotal: 0,
    })
  }

  function removeItem(index: number) {
    remove(index)
  }

  return (
    <CreateOrderContextProvider>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Novo Pedido</DialogTitle>
          <DialogDescription>Crie um novo pedido</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateOrder)}>
          <div className="space-y-10 py-4">
            <div>
              <div className="ml-4 flex items-center gap-4">
                <Label className="text-right">Cliente</Label>
                <CustomersCombobox />
              </div>
            </div>
            <div className="ml-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Label className="text-right">Itens</Label>
                {errors.items && (
                  <span className="text-rose-500">
                    {errors.items.message ===
                    'Array must contain at least 1 element(s)'
                      ? 'Adicione ao menos um item ao pedido'
                      : errors.items.message}
                  </span>
                )}
              </div>
              <Button type="button" variant="secondary" onClick={addItem}>
                Adicionar
              </Button>
            </div>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="">Produto</TableHead>
                  <TableHead className="w-1/6 text-right">Qtd.</TableHead>
                  <TableHead className="w-1/6 text-right">Preço</TableHead>
                  <TableHead className="w-1/6 text-right">Subtotal</TableHead>
                  <TableHead className="w-0 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => {
                  return (
                    <Item
                      key={item.id}
                      index={index}
                      item={item}
                      removeItem={removeItem}
                    />
                  )
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={1}>Total do pedido</TableCell>
                  <TableCell
                    colSpan={2}
                    className="text-right font-medium"
                  ></TableCell>
                  <TableCell colSpan={1} className="text-right font-medium">
                    <span>
                      {watchedItems
                        .reduce((acc, cur) => acc + cur.subtotal, 0)
                        .toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                    </span>
                  </TableCell>
                  <TableCell colSpan={1}></TableCell>
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
