const express = require("express");
const CategoriesService = require("../services/categories.service");

const router = express.Router()
const categoriesService = new CategoriesService()

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId,
  })
})

module.exports = router;
