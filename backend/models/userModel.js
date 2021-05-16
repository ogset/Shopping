import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        title: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        postalCode: { type: String, required: true },
        defaultDelivery: { type: Boolean, required: true, default: false },
        defaultBilling: { type: Boolean, required: true, default: false },
      },
    ],
    cart: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
//() => this.price * this.quantity
