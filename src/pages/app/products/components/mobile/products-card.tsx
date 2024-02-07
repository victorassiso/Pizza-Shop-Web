import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ProductCardProps {
  id: string
  name: string
  category: string
  price: number
  description?: string
}

export function ProductsCard({
  id,
  name,
  category,
  description,
  price,
}: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-primary">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
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
          <strong>Categoria: </strong>
          {category}
        </span>
        <span>
          <strong>Preço: </strong>
          {price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </CardContent>
    </Card>
  )
}
