const router = require('express').Router()
const localRouter = require('./local')
const googleRouter = require('./google')

router.use('/local', localRouter)

router.use('/google', googleRouter)

// Get Me
router.get('/me', (req, res) => {
  res.json(req.user)
})

module.exports = router
