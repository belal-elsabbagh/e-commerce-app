const { HTTP_STATUS_CODES } = require('../config/constants')

class BaseError extends Error {
    code = HTTP_STATUS_CODES.Default;
    constructor(message, errCode = HTTP_STATUS_CODES.Default) {
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
    HTTP_STATUS_CODES: HTTP_STATUS_CODES,
    BaseError: BaseError,
    ValidationError: class ValidationError extends BaseError {
        details = null
        constructor(message, details) {
            super(message, HTTP_STATUS_CODES.ValidationError);
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
            super(message, HTTP_STATUS_CODES.NotFoundError);
        }
    },
    NotAuthenticatedError: class NotAuthenticatedError extends BaseError {
        constructor(message) {
            super(message, HTTP_STATUS_CODES.NotAuthenticated);
        }
    },
    ForbiddenError: class ForbiddenError extends BaseError {
        constructor(message) {
            super(message, HTTP_STATUS_CODES.Forbidden);
        }
    },
    InvalidDuplicateEntryError: class InvalidDuplicateEntryError extends BaseError {
        constructor(message) {
            super(message, HTTP_STATUS_CODES.InvalidDuplicateEntry);
        }
    },

    InternalServerError: class InternalServerError extends BaseError {
        constructor(message) {
            super(message, HTTP_STATUS_CODES.InternalServerError)
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