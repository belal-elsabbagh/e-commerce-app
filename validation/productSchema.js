const Joi = require('joi');
const { productModel } = require('../models');
const nameSchema = Joi.string().min(3).max(30).required();
const priceSchema = Joi.number().min(0).required();
let productCategories = undefined;
productModel.getProductCategories().then((categories) => {
    productCategories = categories;
    module.exports = new Joi.object({
        productName: nameSchema,
        productPrice: priceSchema,
        category: Joi.string().allow(...productCategories).required(),
    })
})
