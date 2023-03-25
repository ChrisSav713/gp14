import React from 'react'
import UsersItem from './UsersItem'

function UsersList(props) {
  const { data } = props
  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-md'>
      <ul role='list' className='divide-y divide-gray-200'>
        {data.map((item) => (
          <UsersItem key={item._id} item={item}></UsersItem>
        ))}
      </ul>
    </div>
  )
}

export default UsersList
