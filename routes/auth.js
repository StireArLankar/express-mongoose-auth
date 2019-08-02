const router = require('express').Router()
const User = require('../models/user.model')
const { registerValidation } = require('../validation')

router.post('/register', async (req, res) => {

  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // const user = await User.findOne({$or:[{ email: req.body.email }, { name: req.body.name }]})
  // if (user) return res.status(400).send('User already exists')

  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send('Email already exists')

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
})

// router.post('/login', (req, res) => {

// })

module.exports = router
