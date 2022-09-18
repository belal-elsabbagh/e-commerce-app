const {DATABASE_CONFIGURATION_VARIABLES} = require('../constants')

/**
 * Constructs the database connection uri
 * @param {DbConfig} dbConfig
 * @returns {String} The database connection uri
 */
function getDbUri(dbConfig) {
    const {username, password, clusterUri, name} = dbConfig
    return `mongodb+srv://${username}:${password}@${clusterUri}/${name}`
}

module.exports = getDbUri(DATABASE_CONFIGURATION_VARIABLES)
