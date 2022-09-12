const { STATUS_CODES } = require('../config/constants')
module.exports = class BaseError extends Error {
    code = STATUS_CODES.Default;
    details = {status: 'none'}
    constructor(message, errCode = STATUS_CODES.Default, details = {status: 'none'}) {
        super(message);
        this.details = details
        this.code = errCode;
    }

    toJSON() {
        return {
            errorCode: this.code,
            message: this.message,
            details: this.details,
        }
    }
}