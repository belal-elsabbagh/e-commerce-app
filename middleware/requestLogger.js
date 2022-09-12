const logObjectToFile = require('../log');

module.exports = async function (req, res, next) {
    const toBeLogged = {
        receivedAt: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        authorization: req.headers.authorization,
        body: req.body,
    }
    try {
        await logObjectToFile(__dirname+"/../log/requests.log", toBeLogged);
        next();
    } catch (err) {
        console.log(err)
        next(err)
    }
}