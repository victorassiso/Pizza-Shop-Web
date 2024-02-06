import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function ProductsTableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-4 w-[250px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[180px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[300px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4" />
        </TableCell>
      </TableRow>
    )
  })
}
