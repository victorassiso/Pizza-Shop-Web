import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CustomersCardProps {
  id: string
  name: string
  email: string
  address: string
  phone: string
}

export function CustomersCard({
  id,
  name,
  email,
  address,
  phone,
}: CustomersCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-primary">{name}</CardTitle>
          </div>
          <Button>
            <Pencil />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <span>
          <strong>ID: </strong>
          {id}
        </span>
        <span>
          <strong>E-mail: </strong>
          {email}
        </span>
        <span>
          <strong>Endereço: </strong>
          {address}
        </span>
        <span>
          <strong>Telefone: </strong>
          {phone}
        </span>
      </CardContent>
    </Card>
  )
}
