const BaseError = require('./BaseError');
const { STATUS_CODES } = require('../config/constants')
module.exports = class ValidationError extends BaseError {
    details = {};
    constructor(message, details = {}) {
        super(message, STATUS_CODES.ValidationError, details);
    }
}