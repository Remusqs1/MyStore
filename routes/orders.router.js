const express = require('express');
const OrderService = require("../services/order.service")
const dtoValidatorHandler = require("../middlewares/validator.handler")
const { createOrderSchema, getOrderSchema, updateOrderSchema, createItemSchema, updateItemSchema } = require("../DTOs/orderDTO")

const router = express.Router();
const orderService = new OrderService();

router.get('/', async (req, res) => {
  const order = await orderService.get()
  res.json(order)
});

router.get('/:id',
  dtoValidatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const order = await orderService.getById(id)
      res.json(order)
    } catch (error) {
      next(error)
    }
  });

router.post('/',
  dtoValidatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body
    const newOrder = await orderService.create(body);

    res.status(201).json({
      message: 'Created',
      success: true,
      data: newOrder
    })
  })

router.post('/addItem',
  dtoValidatorHandler(createItemSchema, 'body'),
  async (req, res) => {
    const body = req.body
    const newItem = await orderService.createItem(body);

    res.status(201).json({
      message: 'Created',
      success: true,
      data: newItem
    })
  })

router.patch('/:id',
  dtoValidatorHandler(getOrderSchema, 'params'),
  dtoValidatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const order = await orderService.update(id, body)

      res.json({
        message: 'Updated',
        success: true,
        id,
        data: order
      })
    } catch (error) {
      next(error)
    }
  })


router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deletedId = await orderService.delete(id)

  res.json({
    message: 'Deleted',
    success: true,
    id: deletedId
  })
})

module.exports = router;
