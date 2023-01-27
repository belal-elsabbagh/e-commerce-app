const Joi = require('joi');
const {
  constants: { STRING_LENGTH },
} = require('../config');

const nameSchema = Joi.string().min(STRING_LENGTH.min).max(STRING_LENGTH.max).required();
const emailSchema = Joi.string().min(STRING_LENGTH.min).email().required();
const passwordSchema = Joi.string().min(STRING_LENGTH.password).max(STRING_LENGTH.max).required();

module.exports.signupSchema = Joi.object({
  username: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

module.exports.userSchema = Joi.object({
  username: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: Joi.string().valid('user', 'admin').required(),
});

module.exports.loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
