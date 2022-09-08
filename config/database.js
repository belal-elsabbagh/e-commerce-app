const mongoose = require("mongoose");

/**
 * The data needed to connect to the database.
 *
 * @typedef {Object} DbConfig
 * @property {string} dbUsername - The username for the database
 * @property {string} dbPassword - The password for the database
 * @property {string} clusterUri - The cluster uri for the database
 * @property {string} dbName - The name of the database
 */
const DATABASE_CONFIGURATION_VARIABLES = {
    dbUsername: 'prime-user',
    dbPassword: '886vwh92rXuMcgEj',
    clusterUri: 'cluster0.mvizz.mongodb.net',
    dbName: 'e-commerce'
}

/**
 * Constructs the database connection uri
 * @param {DbConfig} dbConfig
 * @returns {string} The database connection uri
 */
function getDbUri(dbConfig) {
    return `mongodb+srv://${dbConfig.dbUsername}:${dbConfig.dbPassword}@${dbConfig.clusterUri}/${dbConfig.dbName}`
}

const databaseConnectionUri = getDbUri(DATABASE_CONFIGURATION_VARIABLES)

const connectToDb = () => {
    try {
        mongoose.connect(databaseConnectionUri).then(() => {
            console.log(`Successfully connected to ${databaseConnectionUri}`);
        })
        return true
    } catch (err) {
        throw err
    }
}

connectToDb();

module.exports = {
    databaseConnectionUri,
    collections: {
        product: 'Product',
        user: 'User',
        category: 'Category',
        order: 'Order'
    }
}