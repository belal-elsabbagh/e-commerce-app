module.exports = {
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
}