const BaseError = require('./BaseError');
const {constants: {STATUS_CODES}} = require('../config')
module.exports = class ValidationError extends BaseError {
    details = {};
    constructor(message, details = {}) {
        super(message, STATUS_CODES.ValidationError, details);
    }
}
