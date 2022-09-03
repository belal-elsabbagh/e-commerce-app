const { errors: { ValidationError } } = require('../types')

module.exports.validationSchemas = {
    userSchemas: require('./userSchema'),
    productSchema: require('./productSchema'),
    orderSchema: require('./orderSchema')
}

/**
 * 
 * @param {Object} schemaObject 
 * @param {Object} objectToValidate 
 * @throws {ValidationError} If the object to validate is not valid
 * @returns 
 */
module.exports.validate = async (schemaObject, objectToValidate) => {
    try {
        return await schemaObject.validateAsync(objectToValidate)
    } catch (err) {
        throw new ValidationError(`Failed to validate`, err.details)
    }
}