const regulations = require('../data/staircase_regulations')

const sendResponse = (req, res) => {
  const { regs } = req.query

  const regsType = regulations.filter((reg) => reg.id === regs)
  res.json({
    stairRegs: regsType[0],
  })
}

module.exports = sendResponse
