import React from 'react'

function UsersItem(props) {
  const { item } = props
  return <div>{item.email}</div>
}

export default UsersItem
