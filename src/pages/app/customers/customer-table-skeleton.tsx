import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function CustomerTableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell className="font-mono text-xs font-medium">
          <Skeleton className="my-2 h-5 w-[140px]" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="my-2 h-5 w-[140px]" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="my-2 h-5 w-[180px]" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="my-2 h-5 w-[140px]" />
        </TableCell>
        <TableCell className="font-medium">
          <Skeleton className="my-2 h-5 w-[140px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="my-2 h-5 w-[64px]" />
        </TableCell>
      </TableRow>
    )
  })
}
