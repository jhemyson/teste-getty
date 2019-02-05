const express = require('express')
const mongoose = require('mongoose')
const Youch = require('youch')
const validate = require('express-validation')
const database = require('./config/database')

class Server {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV === 'production'
  
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  middlewares () {
    this.express.use(express.json())
  }

  database() {
    mongoose.connect(database.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
    })
  }

  routes () {
    this.express.use(require('./routes'))
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)

        return res.json(await youch.toJSON())
      }

      return res.status(err.status || 5000 ).json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new Server().express