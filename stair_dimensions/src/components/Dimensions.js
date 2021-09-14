import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Form, Button, Badge, Nav, Tabs, Tab } from 'react-bootstrap'
import { selectRegulations, updateDimensions } from '../actions/actions'
import Loader from './Loader'
import Layout from './Layout'
import Balustrade from './Balustrade'
import riseOptions from '../helpersAndFunctions/riserOptions'
import {
  risePerStepOptionsFunction,
  calculateGoingsFunction,
} from '../helpersAndFunctions/functions'
import { featureSteps } from '../helpersAndFunctions/featureSteps'

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
  const [newelPosts, setNewelPosts] = useState()
  const [newelPostsSide, setNewelPostsSide] = useState('none')

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

  //This sets the initial newel post values and changes the newel posts if the flights top and bottom are too small or if there is a new feature step
  useEffect(() => {
    if (flights && !newelPosts) {
      setNewelPosts([
        {
          id: 1,
          side: 'left',
          location: 'bottom',
          active: false,
          ref: 'main',
        },
        {
          id: 2,
          side: 'right',
          location: 'bottom',
          active: false,
          ref: 'main',
        },
        {
          id: 3,
          side: 'left',
          location: 'top',
          active: false,
          ref: 'main',
        },
        {
          id: 4,
          side: 'right',
          location: 'top',
          active: false,
          ref: 'main',
        },
      ])
    }
    if (newelPosts && flights.length >= 1) {
      let bottomLeftNewel = newelPosts.filter(
        (post) => post.side === 'left' && post.location === 'bottom'
      )[0]
      let bottomRightNewel = newelPosts.filter(
        (post) => post.side === 'right' && post.location === 'bottom'
      )[0]
      let topLeftNewel = newelPosts.filter(
        (post) => post.side === 'left' && post.location === 'top'
      )[0]
      let topRightNewel = newelPosts.filter(
        (post) => post.side === 'right' && post.location === 'top'
      )[0]
      //Removing both newel posts at the bottom of the staircase if the bottom flight has 0 steps
      if (flights[0].treadsInFlight === 0) {
        bottomLeftNewel.active = false
        bottomRightNewel.active = false
      }
      //Removing the top two newel posts if the top flight has 0 steps
      if (flights[flights.length - 1].treadsInFlight === 0) {
        topLeftNewel.active = false
        topRightNewel.active = false
      }
      //Changing the newel post height and making them true if a step is added. Single Steps
      if (leftFeatureStep === 'Bullnose' || leftFeatureStep === 'Curtail') {
        if (flights[0].treadsInFlight > 1) {
          bottomLeftNewel.active = true
        }
        if (flights[0].treadsInFlight === 1) {
          bottomLeftNewel.active = false
        }
      }
      if (leftFeatureStep === 'Bullnose & Curtail') {
        if (flights[0].treadsInFlight > 2) {
          bottomLeftNewel.active = true
        }
        if (flights[0].treadsInFlight === 2) {
          bottomLeftNewel.active = false
        }
      }
      if (rightFeatureStep === 'Bullnose' || rightFeatureStep === 'Curtail') {
        if (flights[0].treadsInFlight > 1) {
          bottomRightNewel.active = true
        }
        if (flights[0].treadsInFlight === 1) {
          bottomRightNewel.active = false
        }
      }
      if (rightFeatureStep === 'Bullnose & Curtail') {
        if (flights[0].treadsInFlight > 2) {
          bottomRightNewel.active = true
        }
        if (flights[0].treadsInFlight === 2) {
          bottomRightNewel.active = false
        }
      }
      const modifiedPosts = [
        bottomLeftNewel,
        bottomRightNewel,
        topLeftNewel,
        topRightNewel,
      ]
      newelPosts.map((post) => {
        modifiedPosts.map((modPost) => {
          if (post.id === modPost.id) {
            post = modPost
          }
        })
      })
    }
  }, [flights, turns, leftFeatureStep, rightFeatureStep])
  console.log(newelPosts)
  //This works out the flights if the information in the turns changes
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

  // Remove newel post if two turns are next to one another
  useEffect(() => {
    turns.map((turn) => {
      //If two winders are next to on another or if the two flights turn in opposide directions
      if (
        (turn.treadsBeforeTurn === 0 &&
          turn.id > 1 &&
          turn.type === '3 Winders' &&
          turns[turn.id - 2].type === '3 Winders') ||
        (turn.treadsBeforeTurn === 0 &&
          turn.id > 1 &&
          turn.direction !== turns[turn.id - 2].direction)
      ) {
        setNewelPosts(
          newelPosts.map((newelPostToChange) => {
            console.log(turns[turn.id - 2])
            if (
              newelPostToChange.ref === turn.id &&
              newelPostToChange.location === 'turnBottom'
            ) {
              return { ...newelPostToChange, active: false }
            } else if (
              newelPostToChange.location === 'turnTop' &&
              newelPostToChange.ref === turns[turn.id - 2].id
            ) {
              return { ...newelPostToChange, active: false }
            } else {
              return newelPostToChange
            }
          })
        )
        //If its not two winders next to one another
      } else if (turn.treadsBeforeTurn === 0 && turn.id > 1) {
        setNewelPosts(
          newelPosts.map((newelPostToChange) => {
            console.log(turns[turn.id - 2])
            if (
              newelPostToChange.ref === turn.id &&
              newelPostToChange.location === 'turnBottom'
            ) {
              return { ...newelPostToChange, active: false }
            } else {
              return newelPostToChange
            }
          })
        )
      }
    })
  }, [turns])
  console.log(flights, 'flights', turns, 'turns')

  //Sets the values of the newel posts to True/False depending on what side the balustrade is on.

  const changeNewelPostSide = () => {
    if (newelPostsSide === 'none') {
      setNewelPosts(
        newelPosts.map((newelPost) => {
          if (newelPost.location === 'inside') {
            return newelPost
          } else {
            return { ...newelPost, active: false }
          }
        })
      )
    } else if (newelPostsSide === 'left') {
      setNewelPosts(
        newelPosts.map((newelPost) => {
          if (newelPost.location === 'inside') {
            return newelPost
          } else if (newelPost.side === 'left') {
            return { ...newelPost, active: true }
          } else {
            return { ...newelPost, active: false }
          }
        })
      )
    } else if (newelPostsSide === 'right') {
      setNewelPosts(
        newelPosts.map((newelPost) => {
          if (newelPost.location === 'inside') {
            return newelPost
          } else if (newelPost.side === 'right') {
            return { ...newelPost, active: true }
          } else {
            return { ...newelPost, active: false }
          }
        })
      )
    } else if (newelPostsSide === 'both') {
      setNewelPosts(
        newelPosts.map((newelPost) => {
          return { ...newelPost, active: true }
        })
      )
    }
  }

  useEffect(() => {
    if (newelPosts) {
      changeNewelPostSide()
    }
  }, [newelPostsSide, turns])

  useEffect(() => {
    if (
      oaRise &&
      numOfRise &&
      goingDepth &&
      turns &&
      flights &&
      leftFeatureStep &&
      rightFeatureStep &&
      newelPosts
    ) {
      dispatch(
        updateDimensions({
          oaRise,
          numOfRise,
          goingDepth,
          turns,
          flights,
          leftFeatureStep,
          rightFeatureStep,
          newelPosts,
        })
      )
    }
  }, [
    oaRise,
    numOfRise,
    goingDepth,
    turns,
    flights,
    leftFeatureStep,
    rightFeatureStep,
    newelPosts,
  ])

  //Add a turn to the left
  //When this is fired it needs to also add newel posts. Posts to have a left or right indicator depending on what button is fired
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
      const lastNewelId = newelPosts[newelPosts.length - 1].id
      const newels = [
        {
          id: lastNewelId + 1,
          side: 'left',
          location: 'inside',
          active: true,
          ref: newTurn.id,
        },
        {
          id: lastNewelId + 2,
          side: 'right',
          location: 'outside',
          active: false,
          ref: newTurn.id,
        },
        {
          id: lastNewelId + 3,
          side: 'right',
          location: 'turnTop',
          active: false,
          ref: newTurn.id,
        },
        {
          id: lastNewelId + 4,
          side: 'right',
          location: 'turnBottom',
          active: false,
          ref: newTurn.id,
        },
      ]
      const updatedNewels = newelPosts.concat(newels)
      setNewelPosts(updatedNewels)
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

      const lastNewelId = newelPosts[newelPosts.length - 1].id
      const newels = [
        {
          id: lastNewelId + 1,
          side: 'right',
          location: 'inside',
          active: true,
          ref: newTurn.id,
        },
        {
          id: lastNewelId + 2,
          side: 'left',
          location: 'outside',
          active: false,
          ref: newTurn.id,
        },
        {
          id: lastNewelId + 3,
          side: 'left',
          location: 'turnTop',
          active: false,
          ref: newTurn.id,
        },
        {
          id: lastNewelId + 4,
          side: 'left',
          location: 'turnBottom',
          active: false,
          ref: newTurn.id,
        },
      ]
      const updatedNewels = newelPosts.concat(newels)
      setNewelPosts(updatedNewels)
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
  //This needs to change the height of the newel post on the turn
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
  //Needs to also remove the newel posts on a turn
  const deleteTurnAndFlightHandler = (turnId) => {
    setTurns(turns.filter((turn) => turn.id < turnId))
    setFlights(flights.filter((flight) => flight.id < turnId + 1))
    setNewelPosts(
      newelPosts.filter((post) => post.ref < turnId || post.ref === 'main')
    )
  }
  //Change the type of turn and also the steps in the turn
  //Needs to change the height of the newel posts on the turn
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

  const newelPostsHandler = (value) => {
    setNewelPostsSide(value)
  }
  console.log(newelPostsSide)
  return loading ? (
    <Loader />
  ) : (
    <>
      <Tabs defaultActiveKey='dimensions'>
        <Tab eventKey='dimensions' title='Dimensions'>
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
            newelPostsSide={newelPostsSide}
          />
        </Tab>
        <Tab eventKey='balustrade' title='Balustrade'>
          <Balustrade
            changeNewelPosts={newelPostsHandler}
            newelPostsSide={newelPostsSide}
          />
        </Tab>
        <Tab eventKey='materials' title='Materials'></Tab>
      </Tabs>
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
