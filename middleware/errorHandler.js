const logObjectToFile = require('../log');
const {BaseError} = require('../errors');
module.exports = async (err, req, res, next) => {
    if (!(err instanceof BaseError)) return next(err);
    await logObjectToFile(__dirname + '/../log/errors.log', {
        thrownAt: new Date().toISOString(),
        err
    });
    res.status(err.code).json(err);
}