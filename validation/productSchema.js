const Joi = require('joi');
const { PRODUCT_CATEGORIES } = require('../config/constants');
const nameSchema = Joi.string().min(3).max(30).required();
const priceSchema = Joi.number().min(0).required();
module.exports = new Joi.object({
    productName: nameSchema,
    productPrice: priceSchema,
    category: Joi.string().allow(...PRODUCT_CATEGORIES).required(),  
})