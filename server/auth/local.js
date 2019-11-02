const router = require('express').Router()
const User = require('../db/user')

// User Signup
router.post('/signup', async (req, res, next) => {
  console.log('route reached: /auth/local/signup')
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
    next(err)
  }
});

// User Login
router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      res.status(401).send('User not found')
    } else if (!user.hasMatchingPassword(req.body.password)) {
      res.status(401).send('Incorrect password')
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
router.delete('/logout', (req, res, next) => {
  req.logOut();
  req.session.destroy()
  res.sendStatus(204);
})

module.exports = router
