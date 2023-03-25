import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UsersList from './UsersList'

function AllUsers() {
  const [users, setUsers] = useState([{}])
  const navigate = useNavigate()

  const getUsers = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/users`)
        .then((response) => {
          console.log(response.data)
          setUsers(response.data)
        })
        .catch((error) => {
          console.log('axios getall catch')
          console.log(error)
        })
    } catch (err) {
      console.log('try catch getall error')
      console.log(err)
    }
  }
  useEffect(() => {
    getUsers()
    //eslint-disable-next-line
  }, [])

  const userList = users.map((item) => {
    return [
      <tr key={item._id}>
        <td>{item._id}</td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.password}</td>
        <td>
          {
            <Button
              variant='link'
              onClick={() => navigate(`/edituser/${item._id}`)}
            >
              Update
            </Button>
          }
        </td>
        <td>
          {
            <Button
              variant='link'
              onClick={() => navigate(`/deleteuser/${item._id}`)}
            >
              Delete
            </Button>
          }
        </td>
      </tr>
    ]
  })

  return (
    <div>
      <h1>UsersDebug</h1>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>#id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>{userList}</tbody>
      </Table>
    </div>
  )
}

export default AllUsers
