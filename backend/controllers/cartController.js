import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Get Products From User
// @Route Post
// @Access Private
const getProductsFromUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.body
  const user = await User.findById(userId)
  res.json(user.cart)
})
// @desc Merge User Cart & Cart
// @Route Patch
// @Access Private

const updateUserCart = asyncHandler(async (req, res) => {
  const { userId, cart } = req.body
  const user = await User.findById(userId)
  if (user) {
    for (const cartItem of cart) {
      const index = user.cart.findIndex(
        (userItem) => userItem._id.toString() === cartItem._id
      )
      if (index === -1) {
        const product = await Product.findById(cartItem._id)
        user.cart.unshift(product)
        user.cart[0].quantity = cartItem.quantity
        user.totalPrice += product.price * cartItem.quantity
      } else {
        user.cart[index].quantity += cartItem.quantity
        user.totalPrice += user.cart[index].price * cartItem.quantity
      }
    }
  }
  user.totalPrice = user.totalPrice.toFixed(2)
  await user.save()
  res.json({ cart: user.cart, totalPrice: user.totalPrice })
})

// @desc Adjust Products From User.Cart
// @Route PUT
// @Access Private

const adjustProductInUserCart = asyncHandler(async (req, res) => {
  const { adjustData, userId } = req.body
  const { _id, opr } = adjustData
  const user = await User.findById(userId)
  const index = user.cart.findIndex((item) => item._id.toString() === _id)
  if (index === -1 && opr === 'ADD') {
    const product = await Product.findById(_id)
    user.cart.unshift(product)
    user.totalPrice += product.price
  }
  if (opr === 'INC' || (opr === 'ADD' && index !== -1)) {
    user.cart[index].quantity += 1
    user.totalPrice += user.cart[index].price
  } else if (opr === 'DEC') {
    if (user.cart[index].quantity > 1) {
      user.cart[index].quantity -= 1
      user.totalPrice -= user.cart[index].price
    } else {
      user.cart[index].quantity = 1
    }
  } else if (opr === 'DEL') {
    user.totalPrice -= user.cart[index].price * user.cart[index].quantity
    user.cart.splice(index, 1)
  }
  user.totalPrice = user.totalPrice.toFixed(2)
  await user.save()
  res.json({ cart: user.cart, totalPrice: user.totalPrice })
})

export { getProductsFromUserCart, adjustProductInUserCart, updateUserCart }
