'use strict'

/**
 * Dependencies
 */

const express = require('express')
const cors = require('cors')

/**
 * Constants
 */

const port = 8080

/**
 * Define app
 */

const app = express()

/**
 * Middleware
 */

app.use(cors())

/**
 * Routes
 */

app.get('/', (req, res) => {
  res.redirect('/api/users')
})

app.post('/api/users', (req, res) => {
  res.sendStatus(200)
})

app.get('/api/users', (req, res) => {
  res.sendStatus(200)
})

app.get('/api/users/:id', (req, res) => {
  res.sendStatus(200)
})

app.delete('/api/users/:id', (req, res) => {
  res.sendStatus(200)
})

app.put('/api/users/:id', (req, res) => {
  res.sendStatus(200)
})

/**
 * Start server
 */

if (module === require.main) {
  console.log('Start server')
  app.listen(port, () => {
    console.log(`Express server running on ${port}`)
  })
}

/**
 * Export app
 */

module.exports = app
