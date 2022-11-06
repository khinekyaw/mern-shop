import { createSlice } from '@reduxjs/toolkit'

const saveToLocal = data => localStorage.setItem('USER', JSON.stringify(data))

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('USER')),
  },
  reducers: {
    add(state, action) {
      state.user = action.payload
      saveToLocal(action.payload)
    },
    clear(state, action) {
      state.user = null
      localStorage.removeItem('USER')
    },
  },
})

export const userActions = userSlice.actions

export default userSlice
