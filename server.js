// Load .env
require('dotenv').config()

// Load the app
const app = require('./app')
const logger = require('./app/logger')
const port = process.env.PORT || 3000

app.listen(port, function (err) {
  if (err) {
    throw err
  }

  logger.info(`Server booted at: http://localhost:${port}`)
})
