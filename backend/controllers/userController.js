import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

//@desc Auth User & Get Token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      name: user.name,
      userId: user.id,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password ')
  }
})

// @desc Register a New User
// @Route POST /api/users/login
// @Access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      name: user.name,
      userId: user.id,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Get User Profile
// @Route POST /api/users/profile
// @Access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId)
  if (user) {
    res.json({
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found.')
  }
})
// @desc Update User Profile
// @Route Put /api/users/profile
// @Access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { updateData } = req.body
  const { opr } = updateData
  const user = await User.findById(req.body.userId)
  if (opr === 'PSW') {
    if (await user.matchPassword(updateData.currentPassword)) {
      user.password = updateData.password
      await user.save()
      res.status(200).json({
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(401)
      throw new Error('The old password is wrong.')
    }
  } else if (opr === 'INF') {
    const { email, name } = updateData
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(401)
      throw new Error('Email already registered.')
    } else {
      user.name = name || user.name
      user.email = email || user.email
      const updatedUser = await user.save()
      if (!updatedUser) {
        res.status(401)
        throw new Error(
          'An Error Occured. Please Check your informations and try again later.'
        )
      } else {
        res.status(200).json({
          name: user.name,
          email: user.email,
        })
      }
    }
  }
})
// @desc Get  User Profile
// @Route Post /api/users/profile/addresses
// @Access Private
const getUserAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId)
  if (user) {
    res.json({
      addresses: user.address,
    })
  } else {
    res.status(404)
    throw new Error('User not found.')
  }
})
// @desc Update User Addresses
// @Route Put /api/users/profile/addresses
// @Access Private
const updateUserAddresses = asyncHandler(async (req, res) => {
  const { addressData } = req.body
  const { opr } = addressData
  const user = await User.findById(req.body.userId)
  if (opr === 'ADR') {
    let address = {
      firstName: addressData.firstName,
      lastName: addressData.lastName,
      title: addressData.title,
      country: addressData.country,
      street: addressData.street,
      city: addressData.city,
      postalCode: addressData.postalCode,
      defaultDelivery: true,
      defaultBilling: true,
    }
    user.address.map((item) => {
      if (item.defaultDelivery === true || item.defaultBilling === true) {
        item.defaultDelivery = false
        item.defaultBilling = false
      }
    })
    user.address.unshift(address)
  } else if (opr === 'ADRC') {
    user.address.map((item) => {
      if (item[`${addressData.opt}`] === true) {
        item[`${addressData.opt}`] = false
      }
      if (item._id.toString() === addressData.id) {
        item[`${addressData.opt}`] = addressData.checked
      }
    })
  } else if (opr === 'DEL') {
    const index = user.address.findIndex(
      (add) => add._id.toString() === addressData.id
    )
    user.address.splice(index, 1)
  }
  await user.save()

  res.json({
    addresses: user.address,
  })
})
export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserAddresses,
  updateUserAddresses,
}
