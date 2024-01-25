import { Skeleton } from '@/components/ui/skeleton'

export function MetricCardSkeleton() {
  return (
    <>
      <Skeleton className="my-1 h-6 w-36" />
      <Skeleton className="h-4 w-48" />
    </>
  )
}
