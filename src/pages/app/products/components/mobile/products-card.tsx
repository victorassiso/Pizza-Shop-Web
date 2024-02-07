import { Pencil } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { UpdateProductDialog } from '../common/update-product-dialog'

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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-primary">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Pencil />
                <span className="sr-only">Editar produto</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <UpdateProductDialog
                id={id}
                name={name}
                description={description}
                category={category}
                price={price}
              />
            </DialogContent>
          </Dialog>
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
