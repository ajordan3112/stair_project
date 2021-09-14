import React from 'react'
import Flights from './Flights'
import FeatureStep from './FeatureStep'
import { Form, Button, Card } from 'react-bootstrap'

const Layout = ({
  setRegsType,
  setRise,
  riseOps,
  numOfRise,
  setNumOfRise,
  numOfRiseOptions,
  oaRise,
  goingDepth,
  setGoingDepth,
  goingOptions,
  flights,
  turns,
  widthChangeHandler,
  deleteTurnAndFlightHandler,
  changeTurnTypeHandler,
  treadsBeforeTurnHandler,
  setTurns,
  leftHandler,
  rightHandler,
  featureStepTypeHandler,
}) => {
  return (
    <Card className='mb-2' bg='light'>
      {' '}
      <div style={style}>
        <Card.Title>
          {' '}
          <h3>Measurments</h3>
        </Card.Title>
        <Form.Group style={selectStyle}>
          <Form.Label>Building Regulations</Form.Label>
          <Form.Control
            as='select'
            className='select'
            onChange={(e) => setRegsType(e.target.value)}
          >
            <option value='ukDom'>UK Domestic</option>
            <option value='ukCom'>UK Commercial</option>
            <option value='scDom'>Scottish Domestic</option>
            <option value='none'>No Regulations</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>OA Rise</Form.Label>
          <Form.Control
            as='select'
            className='select'
            value={oaRise}
            onChange={(e) => setRise(e.target.value)}
          >
            {riseOps.map((option) => (
              <option key={option} value={option}>
                {option}mm
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Number of Risers</Form.Label>
          <Form.Control
            as='select'
            className='mr-sm-2'
            value={numOfRise}
            onChange={(e) => setNumOfRise(e.target.value)}
          >
            {numOfRiseOptions &&
              numOfRiseOptions.map(
                (option) =>
                  option && (
                    <option key={option} value={option}>
                      {option} @ {Math.round((oaRise / option) * 10) / 10}mm
                    </option>
                  )
              )}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tread Depth</Form.Label>
          <Form.Control
            as='select'
            className='mr-sm-2'
            value={goingDepth}
            onChange={(e) => setGoingDepth(parseInt(e.target.value, 10))}
          >
            {goingOptions.map(
              (option) =>
                option && (
                  <option key={option} value={option}>
                    {option}mm
                  </option>
                )
            )}
          </Form.Control>
        </Form.Group>
        <Flights
          flights={flights}
          turns={turns}
          numOfRisers={numOfRise}
          widthChange={widthChangeHandler}
          deleteFlightAndTurn={deleteTurnAndFlightHandler}
          changeTurnType={changeTurnTypeHandler}
          changeTreadsBeforeTurn={treadsBeforeTurnHandler}
          setTurns={setTurns}
        />
        {/* {
    the below will only render if the last entry in the flights array is greater than 4.
    maybe this needs altering becasuse it wont allow you to add a quarter turn on a final small flight.
  } */}
        {flights.length > 0 &&
        flights[flights.length - 1].treadsInFlight < 4 ? (
          <h3>Too small for a turn</h3>
        ) : (
          <>
            <Form.Label>Add a Turn</Form.Label>
            <div className='mb-2'>
              <Button variant='outline-dark' size='sm' onClick={leftHandler}>
                Add Turn Left
              </Button>{' '}
              <Button
                variant='outline-dark'
                size='sm'
                style={{ float: 'right' }}
                onClick={rightHandler}
              >
                Add Turn Right
              </Button>
            </div>
          </>
        )}
        <hr></hr>
        {flights.length > 0 && flights[0].treadsInFlight > 0 && (
          <FeatureStep flights={flights} stepHandler={featureStepTypeHandler} />
        )}
      </div>
    </Card>
  )
}

const style = {
  padding: '15px',
  marginBottom: '50px',
}

const selectStyle = {
  margin: '4px',
}

export default Layout
