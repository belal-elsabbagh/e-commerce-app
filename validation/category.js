const Joi = require('joi');
module.exports = new Joi.object({
    name: Joi.string().required(),
})