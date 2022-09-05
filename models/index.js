let mongoose = require("mongoose");
const { databaseConnectionUri } = require("../config")

const connectToDb = () => {
    try {
        mongoose.connect(databaseConnectionUri)
        return mongoose.connection
    } catch (err) {
        throw err
    }
}

module.exports = {
    dbConnection: connectToDb(),
    userModel: require('./userModel'),
    productModel: require('./productModel'),
    orderModel: require('./orderModel'),
    categoryModel: require('./categoryModel')
}