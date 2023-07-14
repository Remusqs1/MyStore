const Joi = require('joi');
const { createUserSchema, updateUserSchema } = require('./userDTO');

const id = Joi.number().integer();
const name = Joi.string()
const lastName = Joi.string()
const phone = Joi.string()
const userId = Joi.number().integer();

const createCustomerWithUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required()
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
});

const updateCustomerWithUserSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  user: updateUserSchema
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema, createCustomerWithUserSchema, updateCustomerWithUserSchema }
