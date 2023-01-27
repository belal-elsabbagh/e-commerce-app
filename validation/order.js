const Joi = require('joi');
module.exports = new Joi.object({
  userId: Joi.string().required(),
  products: Joi.array()
    .items({
      product: Joi.string().required(),
      quantity: Joi.number().min(1).integer().default(1),
    })
    .required(),
  shippingAddress: Joi.string().required(),
});
