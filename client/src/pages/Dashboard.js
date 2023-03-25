import React, { useContext } from 'react'
import { UserContext } from '../components/UserContext'

function Dashboard() {
  const { user, setUser } = useContext(UserContext)
  return (
    <div className='w-100 text-center'>
      <p className='mt-5'>Dashboard</p>
      <p>logged in as {user.email}</p>
    </div>
  )
}

export default Dashboard
