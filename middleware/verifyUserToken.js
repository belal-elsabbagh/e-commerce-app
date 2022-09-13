const { jwtSecretKey } = require('../config');
const jsonwebtoken = require('jsonwebtoken');
const {NotAuthenticatedError } = require('../errors');
module.exports = async (userToken) => {
    try {
        if (!userToken) throw new NotAuthenticatedError('No token provided')
        return jsonwebtoken.verify(userToken, jwtSecretKey);
    } catch (err) {
        throw new NotAuthenticatedError('Invalid token')
    }
}
