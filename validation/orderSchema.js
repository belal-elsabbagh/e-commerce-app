const Joi = require('joi');
module.exports = new Joi.object({
    userId: Joi.string().required(),
    productIds: Joi.array().items(Joi.string().required()).required(),
    shippingAddress: Joi.string().required(),
    phoneNumber: Joi.string().required(),
})