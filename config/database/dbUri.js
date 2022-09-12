const dbConfig = require('../constants').DATABASE_CONFIGURATION_VARIABLES

/**
 * Constructs the database connection uri
 * @param {DbConfig} dbConfig
 * @returns {string} The database connection uri
 */
function getDbUri(dbConfig) {
    return `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.clusterUri}/${dbConfig.name}`
}

module.exports = getDbUri(dbConfig)