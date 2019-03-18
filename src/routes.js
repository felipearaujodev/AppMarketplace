const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const TokenMiddleware = require('./app/middlewares/auth')

const Controller = require('./app/controllers')
const validators = require('./app/validatos')

routes.post(
  '/users',
  validate(validators.User),
  handle(Controller.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.User),
  handle(Controller.SessionController.store)
)

routes.use(TokenMiddleware)

/**
 * Ads
 */

routes.get('/ads', handle(Controller.AdController.index))
routes.get('/ads/:id', handle(Controller.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(Controller.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(Controller.AdController.update)
)
routes.delete('/ads/:id', handle(Controller.AdController.destroy))

/**
 * Purchases
 */
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(Controller.PurchaseController.store)
)

routes.put('/purchases/:id', handle(Controller.ApproveController.update))

module.exports = routes
