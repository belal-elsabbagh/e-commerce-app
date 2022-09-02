const ac = require('./accessControl')
const { errors: { InternalServerError, ForbiddenError } } = require('../types');

/**
 * 
 * @param {string} role 
 * @param {string} action 
 * @param {string} resource 
 * @throws {InternalServerError} If the access control fails
 * @returns {boolean} true if the user has the permission
 */
module.exports = async (role, action, resource) => {
    // if (!ac.hasRole(role)) throw new InternalServerError(`Role \'${role}\' does not exist.`)
    // if (!ac.hasResource(resource)) throw new InternalServerError(`Resource \'${resource}\' does not exist.`)
    // if (!ac.hasAction(action)) throw new InternalServerError(`Action \'${action}\' does not exist.`)
    try {
        if (!ac.permission({ role: role, action: action, resource: resource }).granted)
            throw new ForbiddenError(`Role ${role} does not have permission to ${action} ${resource}`)
        return true
    } catch (err) {
        throw err
    }
}