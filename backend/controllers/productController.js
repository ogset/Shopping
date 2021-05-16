import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc Fetch All Products
//@route GET /api/products
//@access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//@desc Get Selected Product
//@route GET /api/product/:id
//@access Public
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product not found.' })
  }
})

export { getProducts, getProductByID }
