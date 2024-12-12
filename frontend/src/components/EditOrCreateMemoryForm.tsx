import {
  parseAbsoluteToLocal,
  parseZonedDateTime,
} from '@internationalized/date'
import { Alert, Button, DatePicker, Form, Input } from '@nextui-org/react'
import { useState } from 'react'
import { CreateMemoryInput, Memory } from '../api'

interface EditOrCreateMemoryFormContentProps {
  defaultValues?: CreateMemoryInput
  onSubmit: (data: CreateMemoryInput) => void
}

function EditOrCreateMemoryFormContent({
  defaultValues,
  onSubmit,
}: EditOrCreateMemoryFormContentProps) {
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    if (!data.name || !data.description || !data.timestamp) {
      setSubmissionError('Please fill in all fields')
      return
    }
    console.debug('data', data)
    onSubmit({
      name: data.name,
      description: data.description,
      timestamp: parseZonedDateTime(
        data.timestamp as string
      ).toAbsoluteString(),
    } as unknown as CreateMemoryInput)
  }

  return (
    <Form
      className='w-full justify-center items-center space-y-4'
      validationBehavior='native'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col gap-4 max-w-md'>
        {submissionError?.length ? (
          <Alert color='danger' title={submissionError} />
        ) : null}
        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return 'Please enter the memory name'
            }
          }}
          label='Name'
          labelPlacement='outside'
          name='name'
          placeholder='Enter your name'
          defaultValue={defaultValues?.name}
        />
        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return 'Please enter the memory description'
            }
          }}
          label='Description'
          labelPlacement='outside'
          name='description'
          placeholder='Enter your description'
          defaultValue={defaultValues?.description}
        />
        <DatePicker
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return 'Please enter the memory date and time'
            }
          }}
          label='Date and time'
          labelPlacement='outside'
          name='timestamp'
          defaultValue={
            defaultValues?.timestamp
              ? parseAbsoluteToLocal(defaultValues.timestamp)
              : undefined
          }
        />

        <div className='flex gap-4'>
          <Button className='w-full' color='primary' type='submit'>
            {defaultValues ? 'Save' : 'Create'}
          </Button>
        </div>
      </div>
    </Form>
  )
}

interface EditOrCreateMemoryFormProps {
  memoryToEdit?: Memory
  onSubmit: (data: CreateMemoryInput) => void
}

export default function EditOrCreateMemoryForm({
  memoryToEdit,
  onSubmit,
}: EditOrCreateMemoryFormProps) {
  return (
    <EditOrCreateMemoryFormContent
      defaultValues={memoryToEdit}
      onSubmit={onSubmit}
      //   re-render form to trigger new default values
      key={`editOrCreateMemoryForm-${memoryToEdit?.id ?? 'new'}`}
    />
  )
}
