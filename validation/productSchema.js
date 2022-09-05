const Joi = require('joi');
const {categoryServices} = require("../services");
const nameSchema = Joi.string().min(3).max(30).required();
const priceSchema = Joi.number().min(0).required();

createSchema = async () => {
    const categoryArray = await categoryServices.getCategoriesAsArray();
    module.exports = new Joi.object({
        productName: nameSchema,
        productPrice: priceSchema,
        category: Joi.string().allow(...categoryArray).required(),
    })
}