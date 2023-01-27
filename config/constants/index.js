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

  DATABASE_CONFIGURATION_VARIABLES: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    clusterUri: process.env.DB_CLUSTER_URI,
    name: process.env.DB_NAME,
  },

  STRING_LENGTH: {
    min: 3,
    max: 32,
    password: 8,
  },

  RESOURCE_ACCESS_ACTIONS: {
    read: {
      any: 'read:any',
      own: 'read:own',
    },
    update: {
      any: 'update:any',
      own: 'update:own',
    },
    create: {
      any: 'create:any',
      own: 'create:own',
    },
    delete: {
      any: 'delete:any',
      own: 'delete:own',
    },
  },

  PAGINATION_DEFAULT_VALUES: {
    page: null,
    limit: null,
  },
};
Object.freeze(constants);
module.exports = constants;
