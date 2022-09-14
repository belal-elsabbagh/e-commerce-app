const AccessControl = require('accesscontrol')
const {AUTHORIZATION_RESOURCE_NAMES: resource} = require('../config/constants');
let ac = new AccessControl()
ac.grant(resource.user)
    .createOwn(resource.order)
    .readOwn(resource.order)
    .readAny(resource.product)
    .readAny(resource.productCategory)
ac.grant(resource.admin)
    .extend(resource.user)
    .createAny(resource.user)
    .createAny(resource.product)
    .createAny(resource.productCategory)
    .updateAny(resource.productCategory)
    .deleteAny(resource.productCategory)
    .readAny(resource.order)
    .readAny(resource.user)
    .deleteAny(resource.user);

module.exports = ac;
