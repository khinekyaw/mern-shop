import { configureStore } from '@reduxjs/toolkit'

import cartSlice from './cart-slice'
import userSlice from './user-slice'

const store = configureStore({
  reducer: { cart: cartSlice.reducer, user: userSlice.reducer },
})

export default store
