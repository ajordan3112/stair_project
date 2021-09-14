const express = require('express')

const sendResponse = require('../controllers/controllers')

const router = express.Router()

router.get('/', sendResponse)

//export default router

module.exports = router
