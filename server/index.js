// Express middleware
const express = require('express')
const app = express()

// Logging middleware
const morgan = require('morgan')
app.use(morgan('dev'))

// Body parsing middleware
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Static assets directory
const path = require('path')
app.use(express.static(path.join(__dirname, '../public')))

// Session middleware - including persistent session storage
const session = require('express-session')

const { db } = require('./db')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({ db: db })
dbStore.sync()

app.use(session({
  secret: process.env.SESSION_SECRET || 'a not-so-secret secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false,
}))

// API routes
app.use('/api', require('./api'))

// Serve index html for any non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})


// Handle 500 errors
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

module.exports = app
