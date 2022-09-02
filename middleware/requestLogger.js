const fs = require('fs').promises;
const { InternalServerError } = require('../types/errors');
const noop = () => {};

module.exports = async function (req, res, next) {
    const toBeLogged = {
        receivedAt: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        authorization: req.headers.authorization,
        body: req.body,
    }
    try {
        await fs.appendFile(__dirname+"/../log/requests.log", JSON.stringify(toBeLogged, null, 2) + "\n")
        next();
    } catch (err) {
        console.log(err)
        next(err)
    }
}