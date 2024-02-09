import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CustomersCardListSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <Card key={i}>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <Skeleton className="h-6 w-40" />
            </div>
            <Skeleton className="h-10 w-14" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-5 w-48" />
        </CardContent>
      </Card>
    )
  })
}
