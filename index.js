'use strict'

/**
 * Dependencies
 */

const express = require('express')
const cors = require('cors')
const db = require('./data/db')

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

app.post('/api/users', async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      return res.status(400).send({ errorMessage: "Please provide name and bio for the user." })
    }

    let user = await db.insert(req.body)
    res.status(201).json(user)
  } catch(err) {
    res.status(500).send({ error: "There was an error while saving the user to the database." })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    let users = await db.find()
    res.json(users)
  } catch(err) {
    res.status(500).send({ error: "The users information could not be retrieved." })
  }
})

app.get('/api/users/:id', async (req, res) => {
  try {
    let user = await db.findById(req.params.id)

    if (user) {
      res.json(user)
    } else {
      res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
  } catch(err) {
    res.status(500).send({ error: "The users information could not be retrieved." })
  }
})

app.delete('/api/users/:id', async (req, res) => {
  try {
    let user = await db.findById(req.params.id)

    if (user) {
      db.remove(req.params.id)
      res.sendStatus(200)
    } else {
      res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
  } catch(err) {
    res.status(500).send({ error: "The user could not be removed" })
  }
})

app.put('/api/users/:id', async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      return res.status(400).send({ errorMessage: "Please provide name and bio for the user." })
    }

    let user = await db.findById(req.params.id)

    if (user) {
      db.update(req.params.id, req.body)
      res.sendStatus(200)
    } else {
      res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
  } catch(err) {
    res.status(500).send({ error: "The user information could not be modified." })
  }
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
