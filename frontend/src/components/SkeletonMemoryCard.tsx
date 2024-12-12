import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@nextui-org/react'

export default function SkeletonMemoryCard() {
  return (
    <Card shadow='sm'>
      <CardHeader>
        <Skeleton className='w-full h-6' />
      </CardHeader>
      <CardBody>
        <Skeleton className='w-full h-32' />
      </CardBody>
      <CardFooter className='text-xs font-light'>
        <Skeleton className='w-24 h-4' />
      </CardFooter>
    </Card>
  )
}
