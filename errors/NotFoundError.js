const BaseError = require('./BaseError');
const {
  constants: { STATUS_CODES },
} = require('../config');
module.exports = class NotFoundError extends BaseError {
  constructor(message, query = {}) {
    super(message, STATUS_CODES.NotFoundError, { failedQuery: query });
  }
};
