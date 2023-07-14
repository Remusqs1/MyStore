const joi = require("joi")

const id = joi.number().integer().positive()
const name = joi.string().min(3).max(30).regex(/^\w+(?:\s+\w+)*$/) //alphanum and whitespaces
const price = joi.number().integer().min(1).positive()
const image = joi.string().uri()
const description = joi.string().min(10)
const categoryId = joi.number().integer().positive()

const createProductDTO = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required()
})

const updateProductDTO = joi.object({
  name: name.required(),
  price: price.required(),
  image,
  description: description.required(),
  categoryId: categoryId
})

const getProductDTO = joi.object({
  id: id.required()
})

module.exports = { createProductDTO, updateProductDTO, getProductDTO }
