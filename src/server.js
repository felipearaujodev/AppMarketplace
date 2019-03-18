require('dotenv').config()

const Sentry = require('@sentry/node')
const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const SentryConfig = require('./config/sentry')
const validate = require('express-validation')
const Youch = require('youch')

/* @é mais recomendado utilizar express-session-redis para sessoes
    @neste caso onde usamos servidor offline na própria máquina vamos usar
  file-store para criar um json na pasta tmp/session com os dados de usuário
*/

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.sentry()
    this.database()
    this.midlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init(SentryConfig)
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  midlewares () {
    this.express.use(express.json())
    this.express.use(Sentry.Handlers.requestHandler())
  }

  routes () {
    this.express.use(require('./routes'))
  }

  exception () {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)

        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express // exporta uma instancia do app
