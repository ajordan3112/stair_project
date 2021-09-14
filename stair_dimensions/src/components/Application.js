import React from 'react'
import Dimensions from './Dimensions'
import Animation from './Animation'
import { Row, Col, Container } from 'react-bootstrap'

const Application = () => {
  return (
    <Container style={style}>
      <Row>
        <Col md={12}>
          <Dimensions />
        </Col>
        {/* <Col md={1}></Col>
        <Col md={7}>
          <Animation id='animation' />
        </Col> */}
      </Row>
    </Container>
  )
}

const style = {
  marginTop: '10vh',
  //border: '5px solid red',
}

export default Application
