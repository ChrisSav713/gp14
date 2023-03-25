import React, { useContext, useEffect } from 'react'
import { UserContext } from '../components/UserContext'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function DeleteUser() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const { id } = useParams()

  setUser({ loggedIn: false })
  async function deleteUser() {
    await axios
      .delete('http://localhost:8000/api/users/' + id)
      .then((res) => console.log(res.data.msg))
      .catch((err) => console.log(err.msg))
    navigate('/')
  }

  useEffect(() => {
    deleteUser()
  })

  return <div>Deleting user...</div>
}

export default DeleteUser
