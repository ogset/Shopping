import express from 'express'
import {
  getProducts,
  getProductByID,
} from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductByID)

export default router
