const logObjectToFile = require('../lib/logObjectToFile');
const { errors: { BaseError } } = require('../types');
module.exports = (err, req, res, next) => {
    if (!(err instanceof BaseError)) return next(err);
    logObjectToFile(__dirname + '/../log/errors.log', err);
    res.status(err.code).json(err);
}