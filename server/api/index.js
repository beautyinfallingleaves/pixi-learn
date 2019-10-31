const router = require('express').Router

// dedicated router namespaces
router.use('/users', require('./users'))

router.use((req, res, next) => {
  const err = new Error('Resource not found.')
  err.status = 404
  next(err)
})

module.exports = router
