const router = require('express').Router()
const User = require('../db/user')

// User Signup
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => {
      if (err) {
        next(err)
      } else {
        res.json(user)
      }
    })
  }
  catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists!')
    } else {
    next(err)
    }
  }
})

// User Login
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      res.status(401).send('User not found')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect username and/or password')
    } else {
      req.login(user, err => {
        if (err) {
          next(err)
        } else {
          res.json(user)
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

// User Logout
router.post('/logout', (req, res) => {
  console.log('in Logout API route')
  req.logOut()
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
