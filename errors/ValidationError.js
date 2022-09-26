const BaseError = require('./BaseError');
const {constants: {STATUS_CODES}} = require('../config')
module.exports = class ValidationError extends BaseError {
    constructor(message, details = {status: 'none'}) {
        super(message, STATUS_CODES.ValidationError, details);
    }
}
