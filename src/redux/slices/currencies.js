import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCurrencies = createAsyncThunk('fetchCurrencies', async (baseCurrency) => {
  const {data: {rates}} = await axios.get('https://api.exchangerate.host/latest', {
    params: {
      base: baseCurrency,
      symbols: 'UAH,USD,EUR'
    }
  })

  return rates
})

const initialState = {
  currencies: {},
  loading: 'loading'
}

const currencySlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrencies.pending]: (state) => {
      state.currencies = {}
      state.loading = 'loading'
    },
    [fetchCurrencies.fulfilled]: (state, action) => {
      state.currencies = action.payload
      state.loading = 'loaded'
    },
    [fetchCurrencies.rejected]: (state) => {
      state.currencies = {}
      state.loading = 'loading'
    },
  }
})

export default currencySlice