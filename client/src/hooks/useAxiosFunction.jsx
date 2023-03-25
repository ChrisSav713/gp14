import { useState, useEffect } from 'react'

const useAxiosFunction = () => {
  const [response, setResponse] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [controller, setController] = useState()

  const fetch = async (configObj) => {
    const { instance, method, url, requestConfig = {} } = configObj

    {
      // axios docs
      // {
      //     // `url` is the server URL that will be used for the request
      //     url: '/user',
      //     // `method` is the request method to be used when making the request
      //     method: 'get', // default
      //     // `baseURL` will be prepended to `url` unless `url` is absolute.
      //     // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
      //     // to methods of that instance.
      //     baseURL: 'https://some-domain.com/api',
      //     // `headers` are custom headers to be sent
      //     headers: {'X-Requested-With': 'XMLHttpRequest'},
      //     // `params` are the URL parameters to be sent with the request
      //     // Must be a plain object or a URLSearchParams object
      //     // NOTE: params that are null or undefined are not rendered in the URL.
      //     params: {
      //       ID: 12345
      //     },
      //     // `data` is the data to be sent as the request body
      //     // Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
      //     // When no `transformRequest` is set, must be of one of the following types:
      //     // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      //     // - Browser only: FormData, File, Blob
      //     // - Node only: Stream, Buffer
      //     data: {
      //       firstName: 'Fred'
      //     },
      //     // `timeout` specifies the number of milliseconds before the request times out.
      //     // If the request takes longer than `timeout`, the request will be aborted.
      //     timeout: 1000, // default is `0` (no timeout)
      //     // `withCredentials` indicates whether or not cross-site Access-Control requests
      //     // should be made using credentials
      //     withCredentials: false, // default
      // }
    }

    try {
      setLoading(true)
      const ctrl = new AbortController()
      setController(ctrl)

      const res = await instance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal
      })
      console.log(res)
      setResponse(res.data)
    } catch (err) {
      console.log(err.message)
      setError(err.message)
    } finally {
      console.log('Finally has triggered in useAxiosFunction Hook')
      setLoading(false)
    }
  }

  useEffect(() => {
    //cleanup
    return () => controller && controller.abort()
  }, [controller])

  return [response, error, loading, fetch]
}

export default useAxiosFunction
