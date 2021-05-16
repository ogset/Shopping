import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import useAxios from '../apis/axios.instance'

const initialState = {
  orders: [],
  loading: false,
  error: null,
  status: 'idle',
}

export const placeOrder = createAsyncThunk(
  'orderSlice/placeOrder',
  async (_, { rejectWithValue, getState }) => {
    const {
      userData: { userId, token },
    } = getState().userList
    try {
      useAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await useAxios.put(`/orders`, { userId })
      return data
    } catch (err) {
      return rejectWithValue(err.response.status)
    }
  }
)
export const getUserOrders = createAsyncThunk(
  'orderSlice/getUserOrders',
  async (_, { rejectWithValue, getState }) => {
    const {
      userData: { userId, token },
    } = getState().userList
    try {
      useAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await useAxios.post(`/orders`, { userId })
      return data
    } catch (err) {
      return rejectWithValue(err.response.status)
    }
  }
)

export const orderSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: {
    [placeOrder.pending]: (state) => {
      state.loading = true
      state.error = null
      state.status = 'idle'
    },
    [placeOrder.fulfilled]: (state) => {
      state.loading = false
      state.status = 'success'
    },
    [placeOrder.rejected]: (state, { payload }) => {
      state.loading = false
      state.status = 'failed'
      state.error = payload
    },
    [getUserOrders.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getUserOrders.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.orders = payload
    },
    [getUserOrders.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { reset } = orderSlice.actions

export default orderSlice.reducer
