import { MdDeliveryDining } from 'react-icons/md'
import { ClipLoader } from 'react-spinners'

export function Loading() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center text-foreground opacity-50">
      <MdDeliveryDining size={80} />
      <ClipLoader size={150} className="absolute" color="hsl(var(--text-" />
    </div>
  )
}
