import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function OrderCardListSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <Card key={i}>
        <CardHeader className="flex justify-between">
          <div>
            <Skeleton className="h-7 w-[200px]" />
            <Skeleton className="h-3 w-[250px]" />
          </div>
          <Skeleton className="h-3 w-[80px]" />
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Total: </span>
            <Skeleton className="h-4 w-[40px]" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[100px]" />
        </CardFooter>
      </Card>
    )
  })
}
