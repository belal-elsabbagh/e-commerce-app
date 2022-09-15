const verifyUserToken = require('./verifyUserToken')

function getToken(req) {
    return req.headers.authorization.split(' ')[1];
}

function getRequestedUrl(req) {
    return req.originalUrl
}

/**
 *
 * @param {String} url
 * @returns {boolean}
 */
function isLoginOrSignup(url) {
    return '/users/login'.valueOf() === url.valueOf() || '/users/signup'.valueOf() === url.valueOf()
}

module.exports = async (req, res, next) => {
    try {
        if (isLoginOrSignup(getRequestedUrl(req))) return next();
        req.tokenData = await verifyUserToken(getToken(req));
    } catch (err) {
        return next(err);
    }
    return next();
}
