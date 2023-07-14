const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().min(1);
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

const createItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

const updateItemSchema = Joi.object({
  orderId,
  productId,
  amount,
  status
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, createItemSchema, updateItemSchema }
