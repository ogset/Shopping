import express from 'express'
import { getUserOrder, placeOrder } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/').put(protect, placeOrder).post(protect, getUserOrder)
export default router
