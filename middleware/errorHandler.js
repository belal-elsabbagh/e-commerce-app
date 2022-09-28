const logObjectToFile = require('../log');
module.exports = async (err, req, res, next) => {
    await logObjectToFile(__dirname + '/../log/errors.log', {
        thrownAt: new Date().toISOString(),
        err
    });
console.log(err)
    res.status(err.code || 500).json(err);
}
