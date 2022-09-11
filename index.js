const config = require('./config')
const express = require('express');
const {
    usersController,
    productsController,
    ordersController,
    categoriesController
} = require('./controllers');
const {
    errorHandler,
    requestLogger,
    authenticateBearerToken
} = require('./middleware')
const bodyParser = require('body-parser').json({})

let app = express()
try {
    app.use(bodyParser)
    app.use(requestLogger)
    app.use(authenticateBearerToken) // Deactivate to test the api without authentication
    usersController(app)
    productsController(app)
    ordersController(app)
    categoriesController(app)
    app.use(errorHandler)
    app.listen(config.server.port,config.server.host)
    console.log(`Server started on http://${config.server.host}:${config.server.port}`)
} catch (err) {
    console.error(err);
    process.exit(1)
}
module.exports = app