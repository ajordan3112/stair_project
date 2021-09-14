import React from 'react'
import { Layer, Text, Line, Group } from 'react-konva'

const Winder = ({ bottom, top, scale, rotation, x, y }) => {
  //calculates the amount the winder needs pulling out of the newel post
  const calculateWinderDrag = (bottomWidth, topWidth) => {
    let x
    let smallerWidth
    if (bottomWidth <= topWidth) {
      smallerWidth = bottomWidth
    } else {
      smallerWidth = bottomWidth
    }
    if (smallerWidth >= 825 * scale) {
      x = 0
    } else if (smallerWidth < 825 * scale && smallerWidth >= 800 * scale) {
      x = 30 * scale
    } else if (smallerWidth < 800 * scale) {
      x = 800 * scale - smallerWidth + 30 * scale
    }
    return x
  }

  //Calculate the starting point and also the coordinates of the middle winder step
  const calculateMiddleWinder = (bottomWidth, topWidth) => {
    const startingX = 0
    const startingY = 0

    const pointBmath = () => {
      const A = topWidth
      const B = (A / Math.sin(1.0472)) * Math.sin(0.523599)
      const C = bottomWidth - B
      return [C, 0]
    }

    const pointEMath = () => {
      const A = bottomWidth
      const B = (A / Math.sin(1.0472)) * Math.sin(0.523599)
      const C = topWidth - B
      return [0, C]
    }
    const pointA = [0, 0]
    const pointB = pointBmath()
    const pointC = [bottomWidth, topWidth]
    const pointD = [bottomWidth, topWidth]
    const pointE = pointEMath()

    const points = pointA.concat(pointB, pointC, pointD, pointE)

    const information = {
      x: startingX,
      y: startingY,
      points: points,
    }

    return information
  }

  //Calculate the starting point and also the coordinates of the last winder step
  const calculateLastWinder = (bottomWidth, topWidth) => {
    let points = []
    const calculateXValue = () => {
      const xCoordinate = (topWidth / Math.sin(1.0472)) * Math.sin(0.523599)
      return xCoordinate
    }
    const startingX = bottomWidth - calculateXValue()
    const startingY = 0

    const pointA = [0, 0]
    const pointB = [
      calculateXValue() + calculateWinderDrag(bottomWidth, topWidth),
      0,
    ]
    const pointC = [
      calculateXValue() + calculateWinderDrag(bottomWidth, topWidth),
      topWidth,
    ]
    const pointD = [calculateXValue(), topWidth]
    points = pointA.concat(pointB, pointC, pointD)

    const information = {
      x: startingX,
      y: startingY,
      points: points,
    }

    return information
  }

  //Calculate the starting point and also the coordinates of the first winder step
  const calculateFirstWinder = (bottomWidth, topWidth) => {
    let points = []
    const calculateYValue = () => {
      const yCoordinate = (bottomWidth / Math.sin(1.0472)) * Math.sin(0.523599)
      return yCoordinate
    }
    const startingX = 0
    const startingY = topWidth - calculateYValue()
    const pointA = [0, 0]
    const pointB = [bottomWidth, calculateYValue()]
    const pointC = [
      bottomWidth,
      calculateYValue() + calculateWinderDrag(bottomWidth, topWidth),
    ]
    const pointD = [
      0,
      calculateYValue() + calculateWinderDrag(bottomWidth, topWidth),
    ]

    points = pointA.concat(pointB, pointC, pointD)

    const information = {
      x: startingX,
      y: startingY,
      points: points,
    }

    return information
  }

  return (
    <div>
      <Group x={0} y={0}>
        <Line
          x={calculateFirstWinder(bottom, top).x}
          y={calculateFirstWinder(bottom, top).y}
          points={calculateFirstWinder(bottom, top).points}
          closed
          stroke='black'
        />
        <Line
          x={calculateLastWinder(bottom, top).x}
          y={calculateLastWinder(bottom, top).y}
          points={calculateLastWinder(bottom, top).points}
          closed
          stroke='black'
        />
        <Line
          x={calculateMiddleWinder(bottom, top).x}
          y={calculateMiddleWinder(bottom, top).y}
          points={calculateMiddleWinder(bottom, top).points}
          closed
          stroke='black'
        />
      </Group>
    </div>
  )
}

export default Winder
