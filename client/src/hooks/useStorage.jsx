import { useState, useEffect } from 'react'

function getStoredValue(key, init) {
  const storedValue = JSON.parse(localStorage.getItem(key))
  if (storedValue) {
    return storedValue
  } else {
    if (init instanceof Function) {
      return init()
    } else {
      return init
    }
  }
}
export default function useStorage(key, init) {
  const [value, setValue] = useState(() => {
    return getStoredValue(key, init)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}
