const Joi = require('joi');
module.exports = new Joi.object({
    userId:Joi.string().required(),
    products: Joi.array().items(Joi.string().required()).required(),
    shippingAddress: Joi.string().required(),
})
