const Joi = require("joi");
const userValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("tipo1", "tipo2", "tipo3").required(),
  deleted: Joi.boolean()
});
module.exports = userValidationSchema;