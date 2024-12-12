import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react'
import { useSetRecoilState } from 'recoil'
import { Memory } from '../api'
import { formatTimestamp } from '../helpers'
import { memoryToEditAtom } from '../state'

interface MemoryCardProps {
  memory: Memory
}

export default function MemoryCard({ memory }: MemoryCardProps) {
  const setMemoryToEdit = useSetRecoilState(memoryToEditAtom)
  return (
    <Card shadow='sm' className='p-4'>
      <CardHeader className='justify-between'>
        <h1 className='text-3xl font-medium'>{memory.name}</h1>
        <Button
          variant='ghost'
          className='border-none'
          onPress={() => {
            setMemoryToEdit(memory)
          }}
        >
          Edit
        </Button>
      </CardHeader>
      <CardBody>{memory.description}</CardBody>
      <CardFooter className='text-xs font-light'>
        {formatTimestamp(memory.timestamp)}
      </CardFooter>
    </Card>
  )
}
