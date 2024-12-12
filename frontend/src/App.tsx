import { Alert } from '@nextui-org/react'
import { getMemories } from './api'
import MemoryList from './components/MemoryList'
import useQuery from './hooks/useQuery'

function App() {
  const { data, loading, error } = useQuery(getMemories)
  return (
    <div>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-32'>
        {error ? (
          <Alert
            color='danger'
            title='There was an error fetching your memories'
            description={!!error.message ? error.message : 'Server error'}
          />
        ) : (
          <MemoryList memories={data?.memories ?? []} loading={loading} />
        )}
      </div>
    </div>
  )
}

export default App
