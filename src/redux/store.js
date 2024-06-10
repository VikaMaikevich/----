import { configureStore } from '@reduxjs/toolkit'

import sliceFilterReduser from './slices/sliceFilterReduser'
import sliceButtonReduser from './slices/sliceButtonReduser'
import sliceTicketsReduser from './slices/sliceTicketsReduser'

const store = configureStore( {
  reducer: {
    filters: sliceFilterReduser,
    tabs: sliceButtonReduser,
    tickets: sliceTicketsReduser,
  },
})

export default store
