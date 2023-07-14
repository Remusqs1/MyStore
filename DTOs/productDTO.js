const joi = require("joi")

const id = joi.number().integer().positive()
const name = joi.string().min(3).max(30).regex(/^\w+(?:\s+\w+)*$/) //alphanum and whitespaces
const price = joi.number().integer().min(1).positive()
const image = joi.string().uri()
const description = joi.string().min(10)
const categoryId = joi.number().integer().min(0)

const limit = joi.number().integer().positive()
const offset = joi.number().integer()
const priceMin = joi.number().integer().min(1).positive()
const priceMax = joi.number().integer().min(1).positive()

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

const getProductQueryDTO = joi.object({
  limit,
  offset,
  price,
  priceMin,
  priceMax: priceMax.when("priceMin", {
    is: joi.exist(),
    then: joi.required()
  })
})

module.exports = { createProductDTO, updateProductDTO, getProductDTO, getProductQueryDTO }
