import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import useAxios from '../apis/axios.instance'
const initialState = {
  cart: [],
  loading: false,
  error: null,
  totalPrice: 0,
}

export const getProductsFromUserCart = createAsyncThunk(
  'cart/getProducts',
  async (_, { rejectWithValue, getState }) => {
    const {
      userData: { userId, token },
    } = getState().userList
    try {
      useAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await useAxios.post(`/cart`, { userId })
      return data
    } catch (err) {
      return rejectWithValue(err.response.status)
    }
  }
)
export const adjustProductInUserCart = createAsyncThunk(
  'cart/adjustProduct',
  async (adjustData, { rejectWithValue, getState }) => {
    const {
      userData: { userId, token },
    } = getState().userList
    try {
      useAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await useAxios.put(`/cart`, { adjustData, userId })
      return data
    } catch (err) {
      return rejectWithValue(err.response.status)
    }
  }
)
export const updateUserCart = createAsyncThunk(
  'cartSlice/mergeCartToUserCart',
  async (cart, { rejectWithValue, getState }) => {
    const {
      userData: { userId, token },
    } = getState().userList
    try {
      useAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await useAxios.patch(`/cart`, { userId, cart })
      return data
    } catch (err) {
      return rejectWithValue(err.response.status)
    }
  }
)

export const cartSlice = createSlice({
  name: 'cartList',
  initialState,
  reducers: {
    adjustCart: (state, { payload }) => {
      const { _id, name, price, image, opr } = payload
      const index = state.cart.findIndex((item) => item._id.toString() === _id)
      if (index === -1 && opr === 'ADD') {
        state.cart.unshift({
          name,
          image,
          price,
          _id,
          quantity: 1,
        })
        state.totalPrice += price
      }
      if (opr === 'INC' || (opr === 'ADD' && index !== -1)) {
        state.cart[index].quantity += 1
        state.totalPrice += state.cart[index].price
      } else if (opr === 'DEC') {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity -= 1
          state.totalPrice -= state.cart[index].price
        } else {
          state.cart[index].quantity = 1
        }
      } else if (opr === 'DEL') {
        state.totalPrice -= state.cart[index].price * state.cart[index].quantity
        state.cart.splice(index, 1)
      }
      state.totalPrice = parseFloat(state.totalPrice.toFixed(2))
    },
    clearCart: (state) => initialState,
  },
  extraReducers: {
    [updateUserCart.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [updateUserCart.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.cart = payload.cart
      state.totalPrice = parseFloat(payload.totalPrice)
    },
    [updateUserCart.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [getProductsFromUserCart.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getProductsFromUserCart.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.cart = payload
    },
    [getProductsFromUserCart.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [adjustProductInUserCart.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [adjustProductInUserCart.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.cart = payload.cart
      state.totalPrice = parseFloat(payload.totalPrice)
    },
    [adjustProductInUserCart.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const adjustCartCheck =
  (_id, image, price, name, opr) => (dispatch, getState) => {
    const { userData } = getState().userList
    if (!userData.token) {
      dispatch(adjustCart({ _id, image, price, name, opr }))
    } else {
      dispatch(adjustProductInUserCart({ _id, opr }))
    }
  }

export const { adjustCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
