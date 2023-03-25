import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../components/UserContext'
import axios from 'axios'

function Registration() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [values, setValues] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    confirm: ''
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
    const { first, last, email, password, confirm } = values
    const newErrors = {}

    if (!first) newErrors.first = 'Please enter name'
    if (first.length < 3)
      newErrors.first = 'First name must be at least 3 characters long'
    if (!last) newErrors.last = 'Please enter name'
    if (last.length < 3)
      newErrors.last = 'Last name must be at least 3 characters long'
    if (!email) newErrors.email = 'Please enter date'
    if (email.length < 3)
      newErrors.email = 'Email must be at least 3 characters long'
    if (!password) newErrors.password = 'Please enter password'
    if (password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long'
    if (confirm != password) newErrors.confirm = 'Passwords do not match'
    return newErrors
  }

  const register = async () => {
    const newuser = {
      firstName: values.first,
      lastName: values.last,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirm
    }
    console.log(newuser)
    axios
      .post('http://localhost:8000/api/register', newuser)
      .then((res) => {
        if (res.data.msg === 'success') {
          setUser({
            ...newuser,
            loggedIn: true
          })
          console.log('Register Successful')
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
      register()
    }
  }

  return (
    <FormContainer title='User Registration'>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label size='sm' htmlFor='first'>
            First Name
          </Form.Label>
          <Form.Control
            type='text'
            required
            size='sm'
            id='first'
            value={values.first}
            onChange={(e) => setField('first', e.target.value)}
            isInvalid={!!errors.first}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.first}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label size='sm'>Last Name</Form.Label>
          <Form.Control
            type='text'
            required
            size='sm'
            id='last'
            value={values.last}
            onChange={(e) => setField('last', e.target.value)}
            isInvalid={!!errors.last}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.last}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label size='sm'>Email</Form.Label>
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

        <Form.Group className='mb-3'>
          <Form.Label size='sm'>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            required
            size='sm'
            id='confirm'
            value={values.confirm}
            onChange={(e) => setField('confirm', e.target.value)}
            isInvalid={!!errors.confirm}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.confirm}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type='submit' onClick={handleSubmit}>
          Register
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Registration
