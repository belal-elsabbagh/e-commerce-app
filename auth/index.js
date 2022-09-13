const ac = require('./accessControl')
const {ForbiddenError} = require('../errors');

function idErrorMessage(userId) {
    return `ID '${userId}' does not match your authentication data`
}

function permissionErrorMessage(userTokenData, action, resource) {
    return `User ${userTokenData.user.id} does not have permission to ${action.replace(/:/, ' ')} ${resource}`
}

function getPermission(role, action, resource) {
    return ac.permission({role, action, resource}).granted
}

function checkIdWithToken(userTokenData, userId) {
    return userTokenData.user.id !== userId && userId !== null
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
    const {role} = userTokenData.user
    const invalidIdCheck = checkIdWithToken(userTokenData, userId)
    if (invalidIdCheck) throw new ForbiddenError(idErrorMessage(userId))
    const permissionCheck = getPermission(role, action, resource)
    if (!permissionCheck) throw new ForbiddenError(permissionErrorMessage(userTokenData, action, resource))
    return true
}
