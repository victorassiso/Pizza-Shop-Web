import { OrderStatusType } from '@/@types/order'

interface OrderStatusProps {
  status: OrderStatusType
}

const orderStatusTextMap: Record<OrderStatusType, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
}

const orderStatusColorMap: Record<OrderStatusType, string> = {
  pending: 'slate',
  canceled: 'rose',
  delivered: 'emerald',
  delivering: 'amber',
  processing: 'amber',
}

export function OrderCardStatus({ status }: OrderStatusProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg p-2 bg-${orderStatusColorMap[status]}-400`}
    >
      <span className={`font-medium text-${orderStatusColorMap[status]}-600`}>
        {orderStatusTextMap[status]}
      </span>
    </div>
  )
}
