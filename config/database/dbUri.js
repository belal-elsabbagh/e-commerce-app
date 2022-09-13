const {DATABASE_CONFIGURATION_VARIABLES} = require('../constants')

/**
 * Constructs the database connection uri
 * @param {DbConfig} dbConfig
 * @returns {String} The database connection uri
 */
function getDbUri(dbConfig) {
    return `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.clusterUri}/${dbConfig.name}`
}

module.exports = getDbUri(DATABASE_CONFIGURATION_VARIABLES)