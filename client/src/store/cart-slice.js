import { createSlice } from '@reduxjs/toolkit'

const LS_KEY = 'CART'

const saveToLocal = data => localStorage.setItem(LS_KEY, JSON.stringify(data))

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem(LS_KEY) || '[]'),
  },
  reducers: {
    add(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      if (existingItem) {
        state.items = state.items.map(i =>
          i.id === newItem.id ? { ...i, amount: i.amount + 1 } : i
        )
      } else {
        state.items.push({ ...newItem, amount: 1 })
      }

      saveToLocal(state.items)
    },
    remove(state, action) {
      const { id } = action.payload
      state.items = state.items.reduce((prev, current) => {
        if (current.id === id) {
          current.amount--
        }
        return current.amount ? [...prev, current] : prev
      }, [])
      saveToLocal(state.items)
    },
    clear(state, action) {
      state.items = []
      saveToLocal([])
    },
    setAmount(state, action) {
      const { productId, amount } = action.payload
      console.log(productId, amount)
      state.items = state.items.map(i =>
        i.id === productId ? { ...i, amount } : i
      )
      localStorage.setItem(LS_KEY, JSON.stringify(state.items))
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
