const ac = require('./accessControl')
const {ForbiddenError} = require('../errors');

function getIdErrorMessage(userId) {
    return `ID '${userId}' does not match your authentication data`
}

function getPermissionErrorMessage(role, action, resource) {
    return `Role ${role} does not have permission to ${action} ${resource}`
}

/**
 *
 * @param {Object} userTokenData
 * @param {String} action
 * @param {String} resource
 * @param {?String} userId
 * @throws {ForbiddenError} If the user is denied access
 * @returns {boolean} true if the user has the permission
 */
module.exports = async (userTokenData, action, resource, userId = null) => {
    const {role} = userTokenData.user
    const idCheck = userTokenData.user.id !== userId && userId !== null
    if (!idCheck) throw new ForbiddenError(getIdErrorMessage(userId))
    const permissionCheck = ac.permission({role, action, resource}).granted
    if (!permissionCheck) throw new ForbiddenError(getPermissionErrorMessage(role, action, resource))
    return true
}