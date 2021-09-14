import React from 'react'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import { featureSteps } from '../helpersAndFunctions/featureSteps'

const FeatureStep = ({
  flights,
  leftFeatureStep,
  rightFeatureStep,
  stepHandler,
}) => {
  const onLeftFeatureStepChange = (type) => {
    stepHandler('left', type)
  }
  const onRightFeatureStepChange = (type) => {
    stepHandler('right', type)
  }

  return (
    <div>
      <Form.Group>
        <Form.Label>Feature Steps</Form.Label>
        <Row style={{ paddingBottom: '5px' }}>
          <Col sm='5'>Left Side</Col>
          <Col sm='2'></Col>
          <Col sm='5'>Right Side</Col>
        </Row>
        <Row>
          <Col sm='5' id='left-feature-step'>
            <Form.Control
              as='select'
              className='mr-sm-2'
              id='left-feature-step'
              onChange={(e) => onLeftFeatureStepChange(e.target.value)}
              value={leftFeatureStep}
            >
              {featureSteps
                .filter((step) => {
                  return step.stepsNeeded <= flights[0].treadsInFlight
                })
                .map((step) => (
                  <option key={step.id}>{step.type}</option>
                ))}
            </Form.Control>{' '}
          </Col>
          <Col sm='2'></Col>
          <Col sm='5'>
            <Form.Control
              as='select'
              className='mr-sm-2'
              id='right-feature-step'
              onChange={(e) => onRightFeatureStepChange(e.target.value)}
              value={rightFeatureStep}
            >
              {featureSteps
                .filter((step) => {
                  return step.stepsNeeded <= flights[0].treadsInFlight
                })
                .map((step) => (
                  <option key={step.id}>{step.type}</option>
                ))}
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>
    </div>
  )
}

export default FeatureStep
