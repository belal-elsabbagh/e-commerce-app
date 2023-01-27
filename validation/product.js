const Joi = require('joi');
const {
  constants: { STRING_LENGTH },
} = require('../config');
const nameSchema = Joi.string().min(STRING_LENGTH.min).max(STRING_LENGTH.min).required();
const priceSchema = Joi.number().min(0).required();

module.exports = new Joi.object({
  name: nameSchema,
  price: priceSchema,
  category: Joi.string().allow().required(),
});
