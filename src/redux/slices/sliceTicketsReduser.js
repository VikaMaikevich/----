import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { dispatch, rejectWithValue }) => {
  try {
    const url = 'https://aviasales-test-api.kata.academy/search'
    const res = await fetch(`${url}`)
    if (!res.ok) {
      throw new Error('Could not fetch searchId')
    }
    const data = await res.json()
    return data.searchId
  } catch (e) {
    if (e.message === 'Could not fetch searchId') {
      dispatch(onError(e.message))
      dispatch(clearError())
    }
    return rejectWithValue(e.message)
  }
})

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { id } = getState().tickets
    dispatch(isLoading(true))
    try {
      const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`
      const res = await fetch(`${url}`)
      if (!res.ok) {
        throw new Error('Could not fetch tickets')
      }
      const data = await res.json()

      if (!data.stop) {
        dispatch(addTickets(data.tickets))
        await dispatch(fetchTickets())
      } else {
        dispatch(isLoading(false))
      }
    } catch (e) {
      if (e.message === 'Could not fetch tickets') {
        await dispatch(fetchTickets())
      }
      return rejectWithValue(e.message)
    }
  }
)

const initialState = {
  tickets: [],
  id: '',
  isLoading: false,
  errorMessage: '',
  visibleTickets: 5,
}

const sliceTicketsReducer = createSlice({
  name: 'tickets',
  initialState,
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
