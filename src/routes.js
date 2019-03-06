const express = require('express')

const routes = express.Router()

const TokenMiddleware = require('./app/middlewares/auth')

const Controller = require('./app/controllers')

routes.post('/users', Controller.UserController.store)
routes.post('/sessions', Controller.SessionController.store)

routes.get('/testeToken', TokenMiddleware, (req, res) => res.json({ ok: true }))

module.exports = routes
