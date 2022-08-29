const AccessControl = require('accesscontrol')
const { AUTHORIZATION_RESOURCE_NAMES: resource } = require('../config/constants')
let accessControlObject = new AccessControl(grantsObject);
accessControlObject
    .grant(resource.user)
        .createOwn(resource.order)
        .readOwn(resource.order)
        .readAny(resource.product)
        .readAny(resource.productCategory)
    .grant(resource.admin)
        .extend(resource.user)
        .createAny(resource.product)
        .createAny(resource.productCategory)
        .readAny(resource.order)
        .readAny(resource.user)

module.exports = accessControlObject