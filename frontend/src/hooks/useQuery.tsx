import { useCallback, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

export default function useQuery<Req, Res>(
  fetcher: (req?: Req) => Promise<Res>,
  params?: Req
) {
  const [data, setData] = useState<Res>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const fetch = useCallback(
    (params?: Req) => {
      setLoading(true)
      return fetcher(params)
        .then((res) => {
          setData(res)
        })
        .catch((err) => {
          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [fetcher]
  )

  // bug with this being called twice on initial render, not sure why yet
  useDeepCompareEffect(() => {
    fetch(params)
  }, [{ params }])

  return { loading, error, data, refetch: () => fetch(params) }
}
