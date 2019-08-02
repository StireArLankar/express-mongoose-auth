const router = require('express').Router()
const verifyToken = require('./verify-token')

router.get('/', verifyToken, (req, res) => {
  res.json({ title: 'Random post', user: req.user })
})

module.exports = router
