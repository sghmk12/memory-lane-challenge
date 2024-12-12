import { ScrollShadow } from '@nextui-org/react'
import { Memory } from '../api'
import EditMemoryModal from './EditMemoryModal'
import MemoryCard from './MemoryCard'
import SkeletonMemoryCard from './SkeletonMemoryCard'

interface MemoryListProps {
  memories: Memory[]
  loading?: boolean
}

export default function MemoryList({ memories, loading }: MemoryListProps) {
  return (
    <div className='space-y-2 p-4 justify-center'>
      <EditMemoryModal />
      <h1 className='text-3xl font-bold mx-auto w-fit mb-6'>Your Memories</h1>
      {loading ? (
        <div className='w-full p-8 space-y-6'>
          <SkeletonMemoryCard />
          <SkeletonMemoryCard />
          <SkeletonMemoryCard />
        </div>
      ) : (
        <ScrollShadow className='w-full max-h-[60vh] p-8'>
          <div className='space-y-6'>
            {memories.map((memory, index) => (
              <>
                {index !== 0 ? (
                  <div className='border-l-2 border-gray-300 h-6 mx-auto w-fit'></div>
                ) : null}
                <MemoryCard key={memory.id} memory={memory} />
              </>
            ))}
          </div>
        </ScrollShadow>
      )}
    </div>
  )
}
