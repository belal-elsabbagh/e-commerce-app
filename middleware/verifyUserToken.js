const { jwtSecretKey } = require('../config');
const jsonwebtoken = require('jsonwebtoken');
const {NotAuthenticatedError } = require('../errors');
/**
 *
 * @param {String} userToken
 * @returns
 */
module.exports = async (userToken) => {
    if (!userToken) throw new NotAuthenticatedError('No token provided')
    try {
        return jsonwebtoken.verify(userToken, jwtSecretKey);
    } catch (err) {
        throw new NotAuthenticatedError('Invalid Bearer token')
    }
}
