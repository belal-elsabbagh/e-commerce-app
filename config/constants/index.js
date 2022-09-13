const constants = {
    STATUS_CODES: {
        Default: 1,
        Success: 200,
        Created: 201,
        BadRequest: 400,
        NotAuthenticated: 401,
        Forbidden: 403,
        NotFoundError: 404,
        InvalidDuplicateEntry: 409,
        ValidationError: 422,
        InternalServerError: 500,
        BadGateway: 502,
        ServiceUnavailable: 503,
        MongoDuplicateKeyError: 11000,
    },

    AUTHORIZATION_RESOURCE_NAMES: {
        order: 'order',
        user: 'user',
        admin: 'admin',
        product: 'product',
        productCategory: 'productCategory',
    },

    /**
     * The data needed to connect to the database.
     *
     * @typedef {Object} DbConfig
     * @property {String} username - The username for the database
     * @property {String} password - The password for the database
     * @property {String} clusterUri - The cluster uri for the database
     * @property {String} name - The name of the database
     */
    DATABASE_CONFIGURATION_VARIABLES: {
        username: 'prime-user',
        password: '886vwh92rXuMcgEj',
        clusterUri: 'cluster0.mvizz.mongodb.net',
        name: 'e-commerce'
    },

    STRING_LENGTH: {
        min: 3,
        max: 32,
        password: 8
    }
}
Object.freeze(constants)
module.exports = constants
