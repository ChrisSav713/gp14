import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({ title, children }) {
  return (
    <Container className='w-50 mt-5'>
      <h3 className='mb-3'>{title}</h3>
      <Row className='justify-content-md-center'>
        <Col>{children}</Col>
      </Row>
    </Container>
  )
}

export default FormContainer
