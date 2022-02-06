import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { selectRegulations } from '../actions/actions'
import Loader from './Loader'
import Flights from './Flights'
import riseOptions from '../helpersAndFunctions/riserOptions'
import widthOptions from '../helpersAndFunctions/widthOptions'
import {
  risePerStepOptionsFunction,
  calculateGoingsFunction,
} from '../helpersAndFunctions/functions'

const riseOps = riseOptions
const widthOps = widthOptions
const riserOptions = risePerStepOptionsFunction
//here
const Dimensions = () => {
  const dispatch = useDispatch()

  const regulationsSelect = useSelector((state) => state.regulationsSelect)
  const { loading, regulations, error, success } = regulationsSelect

  const [regsType, setRegsType] = useState('ukDom')
  const [oaRise, setRise] = useState(2600)
  const [numOfRiseOptions, setNumOfRiseOptions] = useState()
  const [numOfRise, setNumOfRise] = useState()
  const [goingOptions, setGoingOptions] = useState([])
  const [goingDepth, setGoingDepth] = useState()
  //const [width, setWidth] = useState(850)
  const [turns, setTurns] = useState([])
  //adding 11 is a bit of a quick fix
  const [flights, setFlights] = useState([])
  const [availableTreads, setAvailableTreads] = useState()

  //Get the regulations and change them based off of the selection
  useEffect(() => {
    dispatch(selectRegulations(regsType))
  }, [dispatch, regsType])

  //Set the options for the number of risers
  useEffect(() => {
    if (oaRise && regulations.stairRegs.maxRise) {
      setNumOfRiseOptions(riserOptions(oaRise, regulations.stairRegs.maxRise))
    }
  }, [regulations, oaRise])

  //Set the number of risers
  useEffect(() => {
    if (numOfRiseOptions) {
      setNumOfRise(numOfRiseOptions[0])
    }
  }, [regulations, oaRise, numOfRiseOptions])

  useEffect(() => {}, [numOfRise, turns, flights])

  //Set the going options
  useEffect(() => {
    if (oaRise && numOfRise && regulations.stairRegs) {
      setGoingOptions(
        calculateGoingsFunction(
          parseInt(oaRise, 10) / parseInt(numOfRise, 10),
          regulations.stairRegs
        )
      )
      console.log(oaRise, numOfRise, numOfRiseOptions)
    }
    if (!goingDepth && goingOptions) {
      setGoingDepth(goingOptions[0])
    }
  }, [regulations, oaRise, numOfRise, numOfRiseOptions])

  //Set the going depth
  useEffect(() => {
    if (goingOptions) {
      setGoingDepth(goingOptions[0])
    }
  }, [goingOptions, numOfRise])

  useEffect(() => {
    if (flights.length < 2 && oaRise && numOfRise) {
      let numOfTreads = numOfRise - 1
      setFlights([{ id: 1, width: 850, treadsInFlight: numOfTreads }])
    }
  }, [regulations, oaRise, numOfRise, turns])

  useEffect(() => {}, [turns])

  //Add a turn to the left
  const leftHandler = () => {
    if (turns.length < 3 && flights.length < 4) {
      const newTurn = {
        id: turns.length + 1,
        type: '3 Winders',
        treads: 3,
        direction: 'left',
        treadsBeforeTurn: 0,
      }
      // const treadsInNewFlight =
      //   flights[flights.length - 1].treadsInFlight - newTurn.treads
      const newFlight = {
        id: flights.length + 1,
        width: flights[0].width,
        treadsInFlight: 0,
      }
      setTurns([...turns, newTurn])
      setFlights([...flights, newFlight])
      console.log(turns, flights)
    }
    calculateFlights()
  }

  //Add a turn to the right
  const rightHandler = () => {
    if (turns.length < 3 && flights.length < 4) {
      const newTurn = {
        id: turns.length + 1,
        type: '3 Winders',
        treads: 3,
        direction: 'right',
        treadsBeforeTurn: 0,
      }
      // const treadsInNewFlight =
      //   flights[flights.length - 1].treadsInFlight - newTurn.treads
      const newFlight = {
        id: flights.length + 1,
        width: flights[0].width,
        treadsInFlight: 0,
      }
      setTurns([...turns, newTurn])
      setFlights([...flights, newFlight])
    }
    calculateFlights()
  }

  const calculateFlights = () => {
    const newFlights = flights.map((flight) => {
      console.log(flights.length)
      // this checks to see if the flight is the last in the array. If so it sets the number of treads in the flight equal to the number of treads in the stair,
      // minus the total numbers of treads in other flights & turns
      if (flight === flights[flights.length - 1]) {
        console.log('last flight in array')
        const totalTreadsInPreviousFlights = flights.reduce((acc, flight) => {
          return acc + parseInt(flight.treadsInFlight)
        }, 0)
        console.log(totalTreadsInPreviousFlights)
        const totalTreadsInTurns = turns.reduce((acc, turn) => {
          return acc + parseInt(turn.treads)
        }, 0)
        console.log(totalTreadsInTurns)
        return {
          ...flight,
          treadsInFlight: totalTreadsInPreviousFlights + totalTreadsInTurns,
        }
      } else {
        console.log('any other flight in array')
        const nextTurn = turns.filter((turn) => turn.id === flight.id)
        const treadsBeforeNextTurn = nextTurn[0].treadsBeforeTurn
        return {
          ...flight,
          treadsInFlight: treadsBeforeNextTurn,
        }
      }
    })
    console.log(newFlights)
  }

  //Change the width of a specific flight
  const widthChangeHandler = (flightId, newWidth) => {
    const flightToChange = flights.find((flight) => flight.id === flightId)

    setFlights(
      flights.map((flight) =>
        flight.id === flightId ? { ...flightToChange, width: newWidth } : flight
      )
    )
  }
  //Delete a flight and a turn
  const deleteTurnAndFlightHandler = (turnId) => {
    setTurns(turns.filter((turn) => turn.id < turnId))
    setFlights(flights.filter((flight) => flight.id < turnId + 1))
    calculateFlights()
  }
  //Change the type of turn and also the steps in the turn
  const changeTurnTypeHandler = (turnId, turnType) => {
    const turnToChange = turns.find((turn) => turn.id === turnId)
    let changedNumberOfSteps
    if (turnType === '3 Winders') {
      changedNumberOfSteps = 3
    } else if (turnType === '2 Winders') {
      changedNumberOfSteps = 2
    } else {
      changedNumberOfSteps = 1
    }
    setTurns(
      turns.map((turn) =>
        turn.id === turnId
          ? { ...turnToChange, type: turnType, treads: changedNumberOfSteps }
          : turn
      )
    )
  }

  console.log(flights, turns)
  return loading ? (
    <Loader />
  ) : (
    <div style={style}>
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
            <option key={option}>{option}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Number of Risers</Form.Label>
        <Form.Control
          as='select'
          className='mr-sm-2'
          //value={numOfRiseOptions}
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
            (option) => option && <option key={option}>{option}</option>
          )}
        </Form.Control>
      </Form.Group>
      {/* <Form.Group>
        <Form.Label>Width</Form.Label>
        <Form.Control
          as='select'
          className='select'
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        >
          {widthOps.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Form.Control>
      </Form.Group> */}
      <Flights
        flights={flights}
        turns={turns}
        numOfRisers={numOfRise}
        widthChange={widthChangeHandler}
        deleteFlightAndTurn={deleteTurnAndFlightHandler}
        changeTurnType={changeTurnTypeHandler}
      />
      {/* {
        the below will only render if the last entry in the flights array is greater than 4.
        maybe this needs altering becasuse it wont allow you to add a quarter turn on a final small flight.
      } */}
      {flights.length > 0 && flights[flights.length - 1].treadsInFlight < 4 ? (
        <h3>Too small for a turn</h3>
      ) : (
        <>
          <Form.Label>Add a Turn</Form.Label>
          <div className='mb-2'>
            <Button variant='primary' size='lg' onClick={leftHandler}>
              Add Turn Left
            </Button>{' '}
            <Button
              variant='primary'
              size='lg'
              style={{ float: 'right' }}
              onClick={rightHandler}
            >
              Add Turn Right
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

const style = {
  border: '2px solid #6b9fcf',
  borderRadius: '2px',
  padding: '15px',
}

const selectStyle = {
  margin: '4px',
}

export default Dimensions
