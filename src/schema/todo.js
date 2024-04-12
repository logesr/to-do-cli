const Joi = require('joi');

const todoItemSchema = Joi.object({
  userId: Joi.number().required(),
  id: Joi.number().required(),
  title: Joi.string().required(),
  completed: Joi.boolean().required(),
});

module.exports = { todoItemSchema };
