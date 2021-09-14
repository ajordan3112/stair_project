export const middleWinderStep = (widthBottom, widthTop) => {
  const pointBmath = () => {
    const A = widthTop
    const B = (A / Math.sin(1.0472)) * Math.sin(0.523599)
    const C = widthBottom - B
    return [C, 0]
  }

  const pointEMath = () => {
    const A = widthBottom
    const B = (A / Math.sin(1.0472)) * Math.sin(0.523599)
    const C = widthTop - B
    return [0, C]
  }
  const pointA = [0, 0]
  const pointB = pointBmath()
  const pointC = [widthBottom, widthTop - 5]
  const pointD = [widthBottom - 5, widthTop]
  const pointE = pointEMath()

  const points = pointA.concat(pointB, pointC, pointD, pointE)
  return points
}

export const topWinderStep = (bottomWidth, topWidth) => {
  let x
  let smallerWidth
  if (bottomWidth <= topWidth) {
    smallerWidth = bottomWidth
  } else {
    smallerWidth = bottomWidth
  }
  if (smallerWidth >= 825) {
    x = 0
  } else if (smallerWidth < 825 && smallerWidth >= 800) {
    x = 30
  } else if (smallerWidth < 800) {
    x = 800 - smallerWidth + 30
  }
  function plotPointsTop() {
    let points = []
    const calculateXValue = () => {
      const xCoordinate = (bottomWidth / Math.sin(1.0472)) * Math.sin(0.523599)
      return xCoordinate
    }

    const pointA = [0, 0]
    const pointB = [calculateXValue() + x, 0]
    const pointC = [calculateXValue() + x, topWidth]
    const pointD = [calculateXValue(), topWidth]
    return pointA.concat(pointB, pointC, pointD)
  }
  return plotPointsTop()
}

export const bottomWinderStep = (bottomWidth, topWidth) => {
  let x
  let smallerWidth
  if (bottomWidth <= topWidth) {
    smallerWidth = bottomWidth
  } else {
    smallerWidth = bottomWidth
  }
  if (smallerWidth >= 825) {
    x = 0
  } else if (smallerWidth < 825 && smallerWidth >= 800) {
    x = 30
  } else if (smallerWidth < 800) {
    x = 800 - smallerWidth + 30
  }
  function plotPointsTop() {
    let points = []
    const calculateXValue = () => {
      const xCoordinate = (bottomWidth / Math.sin(1.0472)) * Math.sin(0.523599)
      return xCoordinate
    }

    const pointA = [0, 0]
    const pointB = [calculateXValue() + x, 0]
    const pointC = [calculateXValue() + x, topWidth]
    const pointD = [calculateXValue(), topWidth]
    return pointA.concat(pointB, pointC, pointD)
  }
  return plotPointsTop()
}
