import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'
//@desc Place a new Order
//@route Put /api/orders
//@access Private
const placeOrder = asyncHandler(async (req, res) => {
  const { userId } = req.body
  let deliveryAddress,
    billingAddress = null
  const user = await User.findById(req.body.userId)
  if (user) {
    user.address.map((add) => {
      if (add.defaultDelivery) {
        deliveryAddress = add
      }
      if (add.defaultBilling) {
        billingAddress = add
      }
    })
    if (!deliveryAddress && billingAddress) {
      deliveryAddress = billingAddress
    } else if (!billingAddress && deliveryAddress) {
      billingAddress = deliveryAddress
    }
    const order = new Order({
      user: userId,
      orderItems: user.cart,
      deliveryAddress,
      billingAddress,
      totalPrice: user.totalPrice,
    })
    const createdOrder = await order.save()
    if (createdOrder) {
      user.cart = []
      user.totalPrice = 0
      await user.save()
    }
    res.status(201).json('Order Successfully  Created.')
  } else {
    res.status(400)
    throw new Error('Please try again later.')
  }
})

//@desc Get orders from user
//@route Post /api/orders
//@access Private
const getUserOrder = asyncHandler(async (req, res) => {
  const { userId } = req.body
  const order = await Order.find({ user: userId })
  if (order) {
    res.json(order.reverse())
  } else {
    res.status(401).json('Order Not Found.')
  }
})

export { placeOrder, getUserOrder }
