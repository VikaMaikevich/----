import { createSlice } from '@reduxjs/toolkit'

import { fetchSearchId } from '../server/actions'

const sliceTicketsReducer = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    id: '',
    isLoading: false,
    errorMessage: '',
    visibleTickets: 5,
  },
  reducers: {
    addTickets: (state, action) => {
      state.tickets.push(...action.payload)
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload
    },
    onError: (state, action) => {
      state.errorMessage = action.payload
    },
    clearError: (state) => {
      state.errorMessage = ''
    },
    showMoreTickets: (state) => {
      state.visibleTickets += 5
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchId.fulfilled, (state, action) => {
      state.id = action.payload
    })
  },
})

export const { addTickets, isLoading, onError, clearError, showMoreTickets } = sliceTicketsReducer.actions

export default sliceTicketsReducer.reducer
