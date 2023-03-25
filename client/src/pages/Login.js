import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../components/UserContext'
import axios from 'axios'

function Login() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const setField = (field, value) => {
    setValues({
      ...values,
      [field]: value
    })

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null
      })
  }

  const formValidate = () => {
    const { email, password } = values
    const newErrors = {}

    if (!email) newErrors.email = 'Please enter date'
    if (email.length < 3)
      newErrors.email = 'Email must be at least 3 characters long'
    if (!password) newErrors.password = 'Please enter password'
    if (password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long'

    return newErrors
  }

  const login = async () => {
    const finduser = { email: values.email, password: values.password }
    console.log(finduser)
    axios
      .post('http://localhost:8000/api/login', finduser)
      .then((res) => {
        if (res.data.msg === 'success') {
          console.log(res.data)
          setUser({
            ...res.data,
            loggedIn: true
          })
          console.log('Login Successful')
          navigate('/dashboard')
        } else {
          console.log('backend catch error')
          console.log(res.data.msg)
        }
      })
      .catch((err) => {
        console.log('axios catch error')
        console.log(err)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const checkErrors = formValidate()
    if (Object.keys(checkErrors).length > 0) {
      setErrors(checkErrors)
    } else {
      login()
    }
  }

  return (
    <>
      <FormContainer title='User Login'>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label size='sm' htmlFor='email'>
              Email
            </Form.Label>
            <Form.Control
              type='text'
              required
              size='sm'
              id='email'
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label size='sm'>Password</Form.Label>
            <Form.Control
              type='password'
              required
              size='sm'
              id='password'
              value={values.password}
              onChange={(e) => setField('password', e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type='submit' onClick={handleSubmit}>
            Login
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default Login
