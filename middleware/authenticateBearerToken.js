const verifyUserToken = require('./verifyUserToken')

function getToken(req) {
    return req.headers.authorization.split(' ')[1];
}

module.exports = async (req, res, next) => {
    const requestedUrl = req.originalUrl
    if(requestedUrl.includes('/login') || requestedUrl.includes('/signup')) return next();
    try {
        req.tokenData = await verifyUserToken(getToken(req));
        next();
    } catch (err) {
        next(err);
    }
}