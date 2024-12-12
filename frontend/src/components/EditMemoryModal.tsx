import {
  Modal,
  ModalContent,
  ModalHeader,
  ScrollShadow,
} from '@nextui-org/react'
import { useRecoilState } from 'recoil'
import { memoryToEditAtom } from '../state'
import EditOrCreateMemoryForm from './EditOrCreateMemoryForm'

export default function EditMemoryModal() {
  const [memoryToEdit, setMemoryToEdit] = useRecoilState(memoryToEditAtom)
  return (
    <Modal
      isOpen={!!memoryToEdit}
      onOpenChange={(open) => {
        if (!open) {
          setMemoryToEdit(null)
        }
      }}
      className='w-full max-w-lg'
    >
      <ModalHeader>Edit Memory</ModalHeader>
      <ModalContent>
        <ScrollShadow className='w-full max-h-[60vh] p-8'>
          <h2 className='text-2xl font-medium mx-auto w-fit mb-6'>
            {`Edit: ${memoryToEdit?.name}`}
          </h2>

          <EditOrCreateMemoryForm
            onSubmit={(data) => {
              console.debug('submit', data)
            }}
            memoryToEdit={memoryToEdit!}
          />
        </ScrollShadow>
      </ModalContent>
    </Modal>
  )
}
