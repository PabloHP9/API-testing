const Joi = require("joi");

const authResponseSchema = Joi.object({
  token: Joi.string().max(16).required(),
});

module.exports = { authResponseSchema };