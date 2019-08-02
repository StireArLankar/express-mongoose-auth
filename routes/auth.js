const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const { registerValidation } = require('../validation')

router.post('/register', async (req, res) => {
  // Validation
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // const user = await User.findOne({$or:[{ email: req.body.email }, { name: req.body.name }]})
  // if (user) return res.status(400).send('User already exists')

  // Cheking existing emails
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send('Email already exists')

  // Hash passwords
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  // Creating user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
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
