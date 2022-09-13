const logObjectToFile = require('../log');
const {BaseError} = require('../errors');
module.exports = async (err, req, res, next) => {
    await logObjectToFile(__dirname + '/../log/errors.log', {
        thrownAt: new Date().toISOString(),
        ...err
    });
    res.status(err.code).json(err);
}
