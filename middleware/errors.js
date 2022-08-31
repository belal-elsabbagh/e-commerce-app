const { STATUS_CODES } = require('../config/constants')

class BaseError extends Error {
    code = STATUS_CODES.Default;
    constructor(message, errCode = STATUS_CODES.Default) {
        super(message);
        this.code = errCode;
    }

    toJSON() {
        return {
            errorCode: this.code,
            errorMessage: this.message,
        };
    }
}

module.exports = {
    HTTP_STATUS_CODES: STATUS_CODES,
    BaseError: BaseError,
    ValidationError: class ValidationError extends BaseError {
        details = null
        constructor(message, details) {
            super(message, STATUS_CODES.ValidationError);
            this.details = details
        }

        toJSON() {
            return {
                errorCode: this.code,
                errorMessage: this.message,
                errorDetails: this.details,
            }
        }
    },
    NotFoundError: class NotFoundError extends BaseError {
        constructor(message) {
            super(message, STATUS_CODES.NotFoundError);
        }
    },
    NotAuthenticatedError: class NotAuthenticatedError extends BaseError {
        constructor(message) {
            super(message, STATUS_CODES.NotAuthenticated);
        }
    },
    ForbiddenError: class ForbiddenError extends BaseError {
        constructor(message) {
            super(message, STATUS_CODES.Forbidden);
        }
    },
    InvalidDuplicateEntryError: class InvalidDuplicateEntryError extends BaseError {
        constructor(message) {
            super(message, STATUS_CODES.InvalidDuplicateEntry);
        }
    },

    InternalServerError: class InternalServerError extends BaseError {
        constructor(message) {
            super(message, STATUS_CODES.InternalServerError)
        }
    },
    errorHandler: (err, req, res, next) => {
        if (!(err instanceof BaseError)) {
            next(err);
            return;
        }
        res.status(err.code).json(err);
    }
}