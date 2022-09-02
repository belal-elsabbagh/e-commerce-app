const express = require('express');
const { usersController, productsController, ordersController } = require('./controllers');
const { errorHandler, requestLogger } = require('./middleware')
const bodyParser = require('body-parser').urlencoded({ extended: false })
const { authenticateBearerToken } = require('./middleware')
const { databaseConnectionUri, apiPort } = require('./config')

try {
    require('./models')
    let app = express()
    app.use(bodyParser)
    app.use(requestLogger)
    app.use(authenticateBearerToken) // Deactivate to test the api without authentication
    console.log(`Successfully connected to ${databaseConnectionUri}`);
    usersController(app)
    productsController(app)
    ordersController(app)
    app.use(errorHandler)
    app.listen(apiPort)
    console.log(`Server started on port ${apiPort}`)
    module.exports = app
} catch (err) {
    console.error(err);
    process.exit(1)
}