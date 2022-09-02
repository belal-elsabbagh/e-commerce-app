const BaseError = require('./BaseError');
const { STATUS_CODES } = require('../../config/constants')
module.exports = class NotAuthenticatedError extends BaseError {
    constructor(message) {
        super(message, STATUS_CODES.NotAuthenticated);
    }
}