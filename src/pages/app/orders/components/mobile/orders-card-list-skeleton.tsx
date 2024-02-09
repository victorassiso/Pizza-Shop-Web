import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function OrdersCardListSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <Card key={i}>
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-14" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-44" />
        </CardContent>
      </Card>
    )
  })
}
