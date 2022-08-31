const express = require('express');
const { usersController, productsController, ordersController } = require('./controllers');
const { errorHandler } = require('./middleware/errors')
const bodyParser = require('body-parser')
const { authenticateBearerToken } = require('./middleware')
const { databaseConnectionUri, apiPort } = require('./config')

try {
    /**
     * @type {Express}
     */
    let app = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(authenticateBearerToken) // Deactivate to test the api without authentication
    require('./models')
    console.log(`Successfully connected to ${databaseConnectionUri}`);
    usersController(app)
    productsController(app)
    ordersController(app)
    app.use(errorHandler)
    app.listen(apiPort)
    console.log(`Server started on port ${apiPort}`)
    module.exports = app
} catch (err) {
    console.log(databaseConnectionUri)
    console.error(err);
    process.exit(1)
}