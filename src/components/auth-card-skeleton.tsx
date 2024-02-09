import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from './ui/skeleton'

export const AuthCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-52 max-w-full" />
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Skeleton className="h-[14px] w-32 max-w-full" />
            <Skeleton className="flex h-10 w-full rounded-md" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Skeleton className="h-[14px] w-32 max-w-full" />
            <Skeleton className="flex h-10 w-full rounded-md" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-10 w-20" />
      </CardFooter>
    </Card>
  )
}
