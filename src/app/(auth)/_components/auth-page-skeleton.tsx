import { Skeleton } from '@/components/ui/skeleton'
import { AuthCardSkeleton } from '@/components/auth-card-skeleton'
import { Separator } from '@/components/ui/separator'

export const AuthPageSkeleton = () => {
  return (
    <div className="py-4">
      <div className="mx-auto w-[350px]">
        <div className="pb-2">
          <AuthCardSkeleton />
        </div>
        <Skeleton className="h-8 my-1 w-40 max-w-full" />
        <Separator className="my-4" />
        <Skeleton className="mx-auto h-10 w-40 max-w-full" />
      </div>
    </div>
  )
}
