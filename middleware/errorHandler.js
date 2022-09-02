const { errors: { BaseError } } = require('../types');
module.exports = (err, req, res, next) => {
    if (!(err instanceof BaseError)) return next(err);
    res.status(err.code).json(err);
}