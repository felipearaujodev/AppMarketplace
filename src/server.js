const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')

/* @é mais recomendado utilizar express-session-redis para sessoes
    @neste caso onde usamos servidor offline na própria máquina vamos usar
  file-store para criar um json na pasta tmp/session com os dados de usuário
*/

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.midlewares()
    this.routes()
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  midlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express // exporta uma instancia do app
