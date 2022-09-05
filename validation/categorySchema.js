const Joi = require('joi');
module.exports = new Joi.object({
    categoryTitle: Joi.string().required(),
})