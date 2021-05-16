import express from 'express'
import {
  getProductsFromUserCart,
  adjustProductInUserCart,
  updateUserCart,
} from '../controllers/cartController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router
  .route('/')
  .post(protect, getProductsFromUserCart)
  .put(protect, adjustProductInUserCart)
  .patch(protect, updateUserCart)
export default router
