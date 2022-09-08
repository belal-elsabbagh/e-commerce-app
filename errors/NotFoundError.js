const BaseError = require('./BaseError');
const { STATUS_CODES } = require('../config/constants')
module.exports = class NotFoundError extends BaseError {
    constructor(message, query = {}) {
        super(message, STATUS_CODES.NotFoundError);
        this.queryData = query
    }

    toJSON() {
        return {
            errorMessage: this.message,
            errorCode: this.code,
            queryData: this.queryData
        }
    }
}