const Joi = require('joi')

module.exports = {
  body: {
    title: Joi.strict().required(),
    description: Joi.strict().required(),
    price: Joi.number().required()
  }
}