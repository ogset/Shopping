import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: {
    loading: false,
    productsData: [],
    status: null,
    error: null,
  },
  product: {
    loading: false,
    productData: {},
    status: null,
    error: null,
  },
}
export const getAllProducts = createAsyncThunk(
  'productList/getAllProducts',
  async () => {
    const { data } = await axios.get('/api/products')
    return data
  }
)
export const getProduct = createAsyncThunk(
  'productList/getProduct',
  async (id) => {
    const { data } = await axios.get(`/api/products/${id}`)
    return data
  }
)

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.products.loading = true
      state.products.status = 'loading'
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.products.loading = false
      state.products.productsData = action.payload
      state.products.status = 'success'
      state.product.productData = {}
    },
    [getAllProducts.rejected]: (state, action) => {
      state.products.loading = false
      state.products.status = 'failed'
      // state.products.error = action.error
    },
    [getProduct.pending]: (state) => {
      state.product.loading = true
      state.product.status = 'loading'
    },
    [getProduct.fulfilled]: (state, action) => {
      state.product.loading = false
      state.product.productData = action.payload
      state.product.status = 'success'
    },
    [getProduct.rejected]: (state, action) => {
      state.product.loading = false
      state.product.status = 'failed'
      // state.product.error = action.error
    },
  },
})

export default productListSlice.reducer
