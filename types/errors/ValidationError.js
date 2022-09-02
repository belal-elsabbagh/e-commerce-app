const BaseError = require('./BaseError');
const { STATUS_CODES } = require('../../config/constants')
module.exports = class ValidationError extends BaseError {
    constructor(message, details = null) {
        super(message, STATUS_CODES.ValidationError);
        this.details = details
    }

    toJSON() {
        return {
            errorCode: this.code,
            message: this.message,
            details: this.details,
        }
    }
}