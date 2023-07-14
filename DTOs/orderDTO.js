const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const status = Joi.string();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  status: status.required()
});

const updateOrderSchema = Joi.object({
  id,
  customerId,
  status
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema }
