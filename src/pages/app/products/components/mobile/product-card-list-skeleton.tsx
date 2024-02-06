import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardListSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      // <h1 key={i}>Test</h1>
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
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-36" />
        </CardContent>
      </Card>
    )
  })
}
