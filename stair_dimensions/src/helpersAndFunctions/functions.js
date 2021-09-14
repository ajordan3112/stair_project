export const risePerStepOptionsFunction = (oaRise, maxRise) => {
  let maxRiser = Math.ceil(oaRise / maxRise)
  let riserOptions = []
  for (let i = 0; i < 6; i++) {
    riserOptions.push(maxRiser + i)
  }
  return riserOptions
}
// const regs = {
//   id: 'ukDom',
//   maxPitch: 42,
//   minGoing: 250,
// }

export const calculateGoingsFunction = (riser, regs) => {
  function getTanFromDegrees(degrees) {
    return Math.tan((degrees * Math.PI) / 180)
  }
  let goingOptions = []
  let minGoing = Math.round(riser / getTanFromDegrees(regs.maxPitch))
  for (let i = 0; goingOptions.length < 38 && i < 150; i++) {
    let going = minGoing + i
    if (going >= regs.minGo) {
      goingOptions.push(going)
    }
  }
  return goingOptions
}

export const arrayFromNumber = (num) => {
  let numArray = []
  for (let i = 0; numArray.length < num; i++) {
    numArray.push(i)
  }
  return numArray
}

export const treadOptionsForTurn = (treadsBeforeCurrent, treadsBeforeNext) => {
  const totalTreads = parseInt(treadsBeforeCurrent) + parseInt(treadsBeforeNext)
  //console.log(treadsBeforeCurrent, treadsBeforeNext, totalTreads)
  let treadOptions = []
  for (let i = 0; i <= totalTreads; i++) {
    treadOptions.push(i)
  }
  return treadOptions
}
