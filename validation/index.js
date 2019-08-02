const Joi = require('@hapi/joi')

const registerSchema = {
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
}

const registerValidation = (data) => {
  return Joi.validate(data, registerSchema)
}

module.exports = {
  registerValidation
}
