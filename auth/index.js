const ac = require('./accessControl')
const { ForbiddenError } = require('../errors');

function isPermissionGranted(role, action, resource) {
    return ac.permission({ role, action, resource }).granted
}

/**
 *
 * @param {Object} userTokenData
 * @param {String|null} userId
 * @returns {boolean}
 */
function idIsInvalid(validId, userId) {
    return validId !== userId && userId !== null
}

/**
 *
 * @param {Object} userTokenData
 * @param {String} action
 * @param {String} resource
 * @param {String|null} userId
 * @throws {ForbiddenError} If the user is denied access
 * @returns {boolean} true if the user has the permission
 */
module.exports = async (userTokenData, action, resource, userId = null) => {
    const { role, validId } = userTokenData.user
    if (idIsInvalid(validId, userId)) { 
        const msg = `ID '${userId}' does not match your authentication data`
        throw new ForbiddenError(msg) 
    }
    if (!isPermissionGranted(role, action, resource)) { 
        const errMsg = `User ${validId} does not have permission to ${action.replace(/:/, ' ')} ${resource}`
        throw new ForbiddenError(errMsg)
    }
    return new Promise(function (resolve, reject) { resolve(true); })
}
