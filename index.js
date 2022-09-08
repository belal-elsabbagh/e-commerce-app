const express = require('express');
const { usersController, productsController, ordersController, categoriesController} = require('./controllers');
const { errorHandler, requestLogger } = require('./middleware')
const bodyParser = require('body-parser').json({})
const { authenticateBearerToken } = require('./middleware')
const config = require('./config')

try {
    require('./models')
    let app = express()
    app.use(bodyParser)
    app.use(requestLogger)
    app.use(authenticateBearerToken) // Deactivate to test the api without authentication
    usersController(app)
    productsController(app)
    ordersController(app)
    categoriesController(app)
    app.use(errorHandler)
    app.listen(config.apiPort)
    console.log(`Server started on port ${config.apiPort}`)
    module.exports = app
} catch (err) {
    console.error(err);
    process.exit(1)
}