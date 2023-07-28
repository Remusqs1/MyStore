const express = require("express")
const ProductsService = require("../services/products.service")
const dtoValidatorHandler = require("../middlewares/validator.handler")
const { createProductDTO, getProductDTO, updateProductDTO, getProductQueryDTO } = require("../DTOs/productDTO")
const passport = require('passport');

const router = express.Router()
const productService = new ProductsService();

router.get('/',
  dtoValidatorHandler(getProductQueryDTO, 'query'),
  async (req, res, next) => {
    try {
      const products = await productService.get(req.query)
      res.json(products)
    } catch (error) {
      next(error)
    }
  });

router.get('/:id',
  dtoValidatorHandler(getProductDTO, 'params'),
  async (req, res, next) => {
    try {
      // const id = req.params.id
      const { id } = req.params
      const product = await productService.getById(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  dtoValidatorHandler(createProductDTO, 'body'),
  async (req, res) => {
    const body = req.body
    const newProduct = await productService.create(body);

    res.status(201).json({
      message: 'Created',
      success: true,
      data: newProduct
    })
  })

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  dtoValidatorHandler(getProductDTO, 'params'),
  dtoValidatorHandler(updateProductDTO, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await productService.update(id, body)

      res.json({
        message: 'Updated',
        success: true,
        id,
        data: product
      })
    } catch (error) {
      next(error)
    }
  })


router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { id } = req.params
    const deletedId = await productService.delete(id)

    res.json({
      message: 'Deleted',
      success: true,
      id: deletedId
    })
  })

module.exports = router;
