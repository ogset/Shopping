import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import useAxios from '../apis/axios.instance'
import { clearCart } from './cartSlice'

const initialState = {
  loading: false,
  userData: {},
  userProfile: {},
  userAddresses: [],
  error: null,
  status: 'idle',
}
export const admission = createAsyncThunk(
  'user/login',
  async (userInfo, { rejectWithValue }) => {
    let route = ''
    if (!userInfo.name) {
      route = 'login'
    }
    try {
      const { data } = await useAxios.post(`users/${route}`, userInfo)
      return data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response.data.message)
    }
  }
)
export const getProfile = createAsyncThunk(
  'user/profile',
  async (_, { getState, rejectWithValue }) => {
    const { userId, token } = getState().userList.userData
    try {
      useAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await useAxios.post(`/users/profile`, { userId })
      return data
    } catch (err) {
      return rejectWithValue(err.response.message)
    }
  }
)
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (updateData, { getState, rejectWithValue }) => {
    const { userId, token } = getState().userList.userData
    try {
      useAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await useAxios.put(`/users/profile`, {
        updateData,
        userId,
      })
      return data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response.data.message)
    }
  }
)
export const getUserAddresses = createAsyncThunk(
  'user/getAddresses',
  async (_, { getState, rejectWithValue }) => {
    const { userId, token } = getState().userList.userData
    try {
      useAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await useAxios.post(`/users/profile/addresses`, {
        userId,
      })
      return data
    } catch (err) {
      return rejectWithValue(err.response.message)
    }
  }
)
export const updateUserAddresses = createAsyncThunk(
  'user/updateAddresses',
  async (addressData, { getState, rejectWithValue }) => {
    const { userId, token } = getState().userList.userData
    try {
      useAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { data } = await useAxios.put(`/users/profile/addresses`, {
        userId,
        addressData,
      })
      return data
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  }
)
export const userSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    reset: (state) => initialState,
    clearError: (state) => {
      state.error = null
    },
    resetStatus: (state) => {
      state.status = 'idle'
    },
  },
  extraReducers: {
    [admission.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [admission.fulfilled]: (state, action) => {
      state.loading = false
      state.userData = action.payload
      state.error = null
    },
    [admission.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [getProfile.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false
      state.userProfile = action.payload
      state.error = null
    },
    [getProfile.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [updateUserProfile.pending]: (state) => {
      state.loading = true
      state.error = null
      state.status = 'idle'
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.loading = false
      state.userProfile = action.payload
      state.status = 'success'
      state.error = null
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.loading = false
      state.status = 'failed'
      state.error = action.payload
    },
    [getUserAddresses.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getUserAddresses.fulfilled]: (state, action) => {
      state.loading = false
      state.userAddresses = action.payload
      state.error = null
    },
    [getUserAddresses.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [updateUserAddresses.pending]: (state) => {
      state.loading = true
      state.error = null
      state.status = 'idle'
    },
    [updateUserAddresses.fulfilled]: (state, action) => {
      state.loading = false
      state.userAddresses = action.payload
      state.status = 'success'
      state.error = null
    },
    [updateUserAddresses.rejected]: (state, action) => {
      state.loading = false
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { reset, clearError, resetStatus } = userSlice.actions

export const logOut = () => (dispatch) => {
  dispatch(reset())
  dispatch(clearCart())
}

export default userSlice.reducer
