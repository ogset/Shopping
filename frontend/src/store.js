import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'
import orderReducer from './slices/orderSlice'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  productsList: productReducer,
  cartList: cartReducer,
  userList: userReducer,
  orderList: orderReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})
