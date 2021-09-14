import React from 'react'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import widthOptions from '../helpersAndFunctions/widthOptions'
import { treadOptionsForTurn } from '../helpersAndFunctions/functions'
import turnTypes from '../helpersAndFunctions/turnTypes'

const widthOps = widthOptions

const Flights = ({
  flights,
  turns,
  numOfRisers,
  widthChange,
  deleteFlightAndTurn,
  changeTurnType,
  changeTreadsBeforeTurn,
  setTurns,
}) => {
  // const treadOptionsOnTurn = (turn) => {
  //   let treadOptions = []
  //   if (turn.id === turns.length) {
  //     let stepsBefore = turn.treadsBeforeTurn
  //     //console.log(stepsBefore)
  //     let stepsAfter = flights[flights.length - 1].treadsInFlight
  //     //console.log(stepsAfter)
  //     treadOptions = treadOptionsForTurn(stepsBefore, stepsAfter)
  //     return treadOptions.map((option) => (
  //       <option key={option}>{option}</option>
  //     ))
  //   } else {
  //     let stepsBefore = turn.treadsBeforeTurn
  //     console.log(stepsBefore)
  //     let stepsAfter = turns[turn.id].treadsBeforeTurn
  //     console.log(stepsAfter)
  //     treadOptions = treadOptionsForTurn(stepsBefore, stepsAfter)
  //     console.log(treadOptions)
  //     return treadOptions.map((option) => (
  //       <option key={option}>{option}</option>
  //     ))
  //   }
  // }

  const treadOptionsOnTurn = (turn) => {
    let treadOptions = []
    //setTurns(...turns)
    let stepsBefore = turn.treadsBeforeTurn
    //console.log(stepsBefore)
    let stepsAfter = flights[turn.id].treadsInFlight
    //console.log(stepsAfter)
    treadOptions = treadOptionsForTurn(stepsBefore, stepsAfter)
    return treadOptions.map((option) => <option key={option}>{option}</option>)
  }

  //console.log(treadOptionsForTurn(0, 8))
  return (
    <div>
      {flights.map((flight) => (
        <div key={flight.id}>
          <hr></hr>
          {turns.map(
            (turn) =>
              turn.id === flight.id - 1 && (
                <div key={turn.id}>
                  <Card
                    style={{
                      margin: '15px 0px',
                      padding: '5px',
                      backgroundColor: '#d6e2ff',
                    }}
                  >
                    <p>
                      <strong>Turn {turn.id}</strong> ({turn.direction})
                      <Button
                        style={{ float: 'right' }}
                        variant='outline-danger'
                        size='sm'
                        onClick={() => deleteFlightAndTurn(turn.id)}
                      >
                        <span>
                          Remove <i class='fas fa-trash'></i>
                        </span>
                      </Button>
                    </p>
                    <Form>
                      <Form.Group as={Row} controlId='formPlaintextEmail'>
                        <Form.Label column sm='6'>
                          Turn Type
                        </Form.Label>
                        <Col sm='6'>
                          <Form.Control
                            as='select'
                            className='select'
                            value={turn.type}
                            onChange={(e) =>
                              changeTurnType(
                                turn.id,
                                e.target.value,
                                e.target.value
                              )
                            }
                          >
                            {turnTypes.map((turnType) => (
                              <option
                                key={turnType.id}
                                value={turnType.type}
                                data={turnType.numberOfTreads}
                              >
                                {turnType.type}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} controlId='formPlaintextPassword'>
                        <Form.Label column sm='6'>
                          Treads Before Turn
                        </Form.Label>
                        <Col sm='6'>
                          <Form.Control
                            as='select'
                            className='select'
                            value={turn.treadsBeforeTurn}
                            onChange={(e) =>
                              changeTreadsBeforeTurn(turn.id, e.target.value)
                            }
                          >
                            {treadOptionsOnTurn(turn)}
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Form>
                  </Card>
                </div>
              )
          )}
          <Form.Label>Width (flight {flight.id})</Form.Label>
          <Form.Control
            as='select'
            className='select'
            value={flight.width}
            onChange={(e) => widthChange(flight.id, e.target.value)}
          >
            {widthOps.map((option) => (
              <option key={option} value={option}>
                {option}mm
              </option>
            ))}
          </Form.Control>
        </div>
      ))}
      <br></br>
    </div>
  )
}

export default Flights
