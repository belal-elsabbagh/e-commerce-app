module.exports = function (req, res, next) {
    console.log({
        receivedAt: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        authorization: req.headers.authorization,
        body: req.body,
    })
    next();
}