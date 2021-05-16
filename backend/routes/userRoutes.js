import express from 'express'
import {
  authUser,
  getUserAddresses,
  getUserProfile,
  registerUser,
  updateUserProfile,
  updateUserAddresses,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/', registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .post(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/profile/addresses')
  .post(protect, getUserAddresses)
  .put(protect, updateUserAddresses)
router.route('/profile/orders')

export default router
