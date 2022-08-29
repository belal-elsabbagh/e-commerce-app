require("dotenv").config();
const express = require('express');
const { usersController, productsController } = require('./controllers');
const { errorHandler } = require('./middleware/errors')
const bodyParser = require('body-parser')
const verifyToken = require('./middleware/authentication')
const { databaseConnectionUri } = require('./config')
const { API_PORT } = process.env

try {
    /**
     * @type {Express}
     */
    let app = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(verifyToken) // Deactivate to test the api without authentication
    require('./models')
    console.log(`Successfully connected to ${databaseConnectionUri}`);
    usersController(app)
    productsController(app)
    app.use(errorHandler)
    app.listen(API_PORT)
    console.log(`Server started on port ${API_PORT}`)
    module.exports = app
} catch (err) {
    console.log(databaseConnectionUri)
    console.error(err);
    process.exit(1)
}