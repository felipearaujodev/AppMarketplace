const express = require('express')

const routes = express.Router()

const TokenMiddleware = require('./app/middlewares/auth')

const Controller = require('./app/controllers')

routes.post('/users', Controller.UserController.store)
routes.post('/sessions', Controller.SessionController.store)

routes.use(TokenMiddleware)

/**
 * Ads
 */

routes.get('/ads', Controller.AdController.index)
routes.get('/ads/:id', Controller.AdController.show)
routes.post('/ads', Controller.AdController.store)
routes.put('/ads/:id', Controller.AdController.update)
routes.delete('/ads/:id', Controller.AdController.destroy)

module.exports = routes
