const express = require('express')
const app = express()

app.use(require('./logging.middleware'))

app.use(require('./body-parsing.middleware'))

// Session middleware (including persistent session storage)
const session = require('express-session')
const { db } = require('../db')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({ db: db })
dbStore.sync()

app.use(session({
  secret: process.env.SESSION_SECRET || 'a not-so-secret secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false,
}))

app.use(require('./passport.middleware'))

app.use('/api', require('../api'))

app.use('/auth', require('../auth'))

app.use(require('./statics.middleware'))

// Serve index html for any non-API requests
const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})


app.use(require('./error.middleware'))

module.exports = app
