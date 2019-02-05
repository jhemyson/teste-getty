const express = require('express')
const validate = require('express-validation')
const AdValidator = require('./app/validators/ad')

const AdController = require('./app/controllers/AdController')

const routes = express.Router()

/**
*  Ads
**/
routes.get('/ads', AdController.index)
routes.get('/ads/:id', AdController.show)
routes.post('/ads', validate(AdValidator), AdController.store)
routes.put('/ads/:id', validate(AdValidator), AdController.update)
routes.delete('/ads/:id', AdController.destroy)


module.exports = routes