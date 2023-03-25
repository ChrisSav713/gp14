import { useEffect } from 'react'

export default function useLog(value, title) {
  useEffect(() => {
    console.log(title + ' -> ')
    console.log(value)
  }, [value])
}
