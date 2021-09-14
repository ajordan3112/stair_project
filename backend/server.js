const express = require('express')
const routes = require('./routes/routes')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const app = express()

app.use(express.json())

app.use('/application', routes)

const start = path.resolve()

console.log(`${start}/stair_dimensions/build`)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(start, '/stair_dimensions/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(start, 'stair_dimensions', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

const PORT = process.env.PORT || 4000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
