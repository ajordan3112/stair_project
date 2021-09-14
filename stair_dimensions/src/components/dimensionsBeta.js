import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Form, Button, Badge } from 'react-bootstrap'
import { selectRegulations } from '../actions/actions'
import Loader from './Loader'
import Layout from './Layout'
import riseOptions from '../helpersAndFunctions/riserOptions'
import {
  risePerStepOptionsFunction,
  calculateGoingsFunction,
} from '../helpersAndFunctions/functions'

//Things to sort out

//As the amount of steps get fewer at the end of the staircase, the options for adding a turn should decrease.

const riseOps = riseOptions
const riserOptions = risePerStepOptionsFunction

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
  const [turns, setTurns] = useState([])
  const [flights, setFlights] = useState([])
  const [leftFeatureStep, setLeftFeatureStep] = useState()
  const [rightFeatureStep, setRightFeatureStep] = useState()
  const [step, setStep] = useState(1)

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

  //sets the feature step value to None if it is undefined
  useEffect(() => {
    !leftFeatureStep && setLeftFeatureStep('None')
    !rightFeatureStep && setRightFeatureStep('None')
    if (leftFeatureStep && rightFeatureStep) {
      console.log(leftFeatureStep, rightFeatureStep)
    }
  }, [rightFeatureStep, leftFeatureStep])

  //resets the value of the feature steps to 0 if the number of steps isnt enough. This needs to be eddited
  useEffect(() => {
    if (flights.length > 0 && flights[0].treadsInFlight < 2) {
      if (leftFeatureStep === 'Bullnose & Curtail') {
        setLeftFeatureStep('None')
      }
      if (rightFeatureStep === 'Bullnose & Curtail') {
        setRightFeatureStep('None')
      }
    }
    if (flights.length > 0 && flights[0].treadsInFlight < 1) {
      setLeftFeatureStep('None')
      setRightFeatureStep('None')
    }
  }, [flights])

  useEffect(() => {
    if (flights.length < 2 && oaRise && numOfRise) {
      let numOfTreads = numOfRise - 1
      setFlights([{ id: 1, width: 850, treadsInFlight: numOfTreads }])
    } else if (flights.length >= 2 && oaRise && numOfRise) {
      //create an variable to hold the last value in the array
      let lastFlight = flights[flights.length - 1]
      //Create new array removing the last flight
      let newFlights = flights.filter((flight) => flight.id !== flights.length)
      //Map through flights chanding the tread values
      newFlights.map((flight) => {
        const nextTurn = turns.filter((turn) => turn.id === flight.id)[0]
        const treadsBeforeNextTurn = nextTurn.treadsBeforeTurn
        flight.treadsInFlight = treadsBeforeNextTurn
      })
      //Work out the value of the treads in the last flight
      const totalTreadsInPreviousFlights = newFlights.reduce((acc, flight) => {
        return acc + parseInt(flight.treadsInFlight)
      }, 0)
      const totalTreadsInTurns = turns.reduce((acc, turn) => {
        return acc + parseInt(turn.treads)
      }, 0)
      const treadsInLastFlight =
        numOfRise - (totalTreadsInPreviousFlights + totalTreadsInTurns + 1)
      lastFlight = {
        ...lastFlight,
        treadsInFlight: treadsInLastFlight,
      }
      //Add the last flight to the new flights array
      newFlights.push(lastFlight)
      setFlights(newFlights)
    }
  }, [oaRise, numOfRise, turns])

  console.log(flights, 'flights', turns, 'turns')

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
      const newFlight = {
        id: flights.length + 1,
        width: flights[0].width,
        treadsInFlight: 0,
      }
      setFlights([...flights, newFlight])
      setTurns([...turns, newTurn])

      console.log(turns, flights)
    }
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
      const newFlight = {
        id: flights.length + 1,
        width: flights[0].width,
        treadsInFlight: 0,
      }
      setFlights([...flights, newFlight])
      setTurns([...turns, newTurn])
    }
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
  //Change the number of steps before a turn
  const treadsBeforeTurnHandler = (turnId, newTreadsBeforeTurn) => {
    const turnToChange = turns.find((turn) => turn.id === turnId)
    let turnInfront
    let treadsBeforeTurnInfront
    let treadsBeforeTurnBeforeChange
    let changeInTreads
    if (turnId !== turns.length) {
      turnInfront = turns.find((turn) => turn.id === turnId + 1)
      treadsBeforeTurnInfront = turnInfront.treadsBeforeTurn
      treadsBeforeTurnBeforeChange = turnToChange.treadsBeforeTurn
      changeInTreads = treadsBeforeTurnBeforeChange - newTreadsBeforeTurn
    }

    setTurns(
      turns.map((turn) =>
        turn.id === turnId
          ? { ...turnToChange, treadsBeforeTurn: parseInt(newTreadsBeforeTurn) }
          : turn.id === turnId + 1 && turnId !== turns.length
          ? {
              ...turnInfront,
              treadsBeforeTurn: parseInt(
                treadsBeforeTurnInfront + changeInTreads
              ),
            }
          : turn
      )
    )
  }
  //Delete a flight and a turn
  const deleteTurnAndFlightHandler = (turnId) => {
    setTurns(turns.filter((turn) => turn.id < turnId))
    setFlights(flights.filter((flight) => flight.id < turnId + 1))
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

  //Change a feature Step
  const featureStepTypeHandler = (side, type) => {
    if (side === 'left') {
      setLeftFeatureStep(type)
    } else if (side === 'right') {
      setRightFeatureStep(type)
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Layout
        setRegsType={setRegsType}
        setRise={setRise}
        riseOps={riseOps}
        numOfRise={numOfRise}
        setNumOfRise={setNumOfRise}
        numOfRiseOptions={numOfRiseOptions}
        oaRise={oaRise}
        goingDepth={goingDepth}
        setGoingDepth={setGoingDepth}
        goingOptions={goingOptions}
        flights={flights}
        turns={turns}
        widthChangeHandler={widthChangeHandler}
        deleteTurnAndFlightHandler={deleteTurnAndFlightHandler}
        changeTurnTypeHandler={changeTurnTypeHandler}
        treadsBeforeTurnHandler={treadsBeforeTurnHandler}
        setTurns={setTurns}
        leftHandler={leftHandler}
        rightHandler={rightHandler}
        featureStepTypeHandler={featureStepTypeHandler}
      />
      {/* <div style={style}>
        <h1 varient='primary'>Dimensions</h1>
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
        
        {flights.length > 0 &&
        flights[flights.length - 1].treadsInFlight < 4 ? (
          <h3>Too small for a turn</h3>
        ) : (
          <>
            <Form.Label>Add a Turn</Form.Label>
            <div className='mb-2'>
              <Button variant='outline-primary' size='sm' onClick={leftHandler}>
                Add Turn Left
              </Button>{' '}
              <Button
                variant='outline-primary'
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
      </div> */}
    </>
  )
}

const style = {
  border: '2px solid #6b9fcf',
  borderRadius: '2px',
  padding: '15px',
  marginBottom: '50px',
}

const selectStyle = {
  margin: '4px',
}

export default Dimensions
