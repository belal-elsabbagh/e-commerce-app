const BaseError = require('./BaseError');
const {constants: {STATUS_CODES}} = require('../config')
module.exports = class InvalidDuplicateEntryError extends BaseError {
    constructor(message) {
        super(message, STATUS_CODES.InvalidDuplicateEntry);
    }
}
