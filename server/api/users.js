const router = require('express').Router()
const { User } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (err) {
    next(err)
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    await user.update(req.body)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    await User.destroy({ where: { id }})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
});


module.exports = router;
