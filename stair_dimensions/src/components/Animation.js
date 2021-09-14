import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stage, Layer, Rect, Text, Circle, Line, Group } from 'react-konva'
import Konva from 'konva'
import {
  middleWinderStep,
  topWinderStep,
} from '../helpersAndFunctions/shapeMaths'
import Winder from './canvas/Winder'
import { stages } from 'konva/lib/Stage'
import { dim } from 'colors'

const Animation = () => {
  const [scale, setScale] = useState(0.15)
  const [dims, setDims] = useState()

  const dimensionsSelect = useSelector((state) => state.dimensionsUpdate)
  const { dimensions, success } = dimensionsSelect

  useEffect(() => {
    if (dimensions) {
      setDims(dimensions)
    }
  }, [dimensions])

  useEffect(() => {
    function handleResize() {}
    window.addEventListener('resize', handleResize)
  })

  const renderWinders = () => {
    const winders = dims.turns.map((turn) => {
      let bottomWidth = dims.flights[turn.id - 1].width
      let topWidth = dims.flights[turn.id].width
      let direction = turn.direction
      return (
        <Winder
          bottom={bottomWidth * scale}
          top={topWidth * scale}
          scale={scale}
        ></Winder>
      )
    })

    return winders
  }

  const rederText = () => {
    return <Text text='Some text on canvas' fontSize={15}></Text>
  }

  const points = topWinderStep(765, 850)
  console.log(dimensions)
  return (
    <div style={{ border: '1px solid black', margin: '20px' }}>
      <Stage width={600} height={750}>
        <Layer x={300} y={300}>
          {dimensions.flights &&
            dimensions.flights.length > 1 &&
            renderWinders()}
        </Layer>
      </Stage>
    </div>
  )
}

export default Animation
