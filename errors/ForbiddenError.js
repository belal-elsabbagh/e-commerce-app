const BaseError = require('./BaseError');
const { STATUS_CODES } = require('../config/constants')
module.exports = class ForbiddenError extends BaseError {
    constructor(message) {
        super(message, STATUS_CODES.Forbidden);
    }
}