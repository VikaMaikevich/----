import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tabs: [
    { label: 'Самый дешевый', name: 'cheapest', active: true },
    { label: 'Самый быстрый', name: 'fastest', active: false },
    { label: 'Оптимальный', name: 'optimal', active: false },
  ],
}

const sliceButtonReducer = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.tabs = state.tabs.map((item) =>
        item.name === action.payload ? { ...item, active: true } : { ...item, active: false }
      )
    },
  },
})

export const { setActive } = sliceButtonReducer.actions
export default sliceButtonReducer.reducer
