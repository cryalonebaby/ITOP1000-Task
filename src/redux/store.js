import {configureStore} from '@reduxjs/toolkit'
import currencySlice from './slices/currencies'

const store = configureStore({
  reducer: {
    currencies: currencySlice.reducer
  }
})

export default store