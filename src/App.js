import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import MainPage from './pages/MainPage'
import LoadingPage from './pages/LoadingPage'
import {fetchCurrencies} from './redux/slices/currencies'
import axios from 'axios'

function App() {
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.currencies)

  const isLoading = loading === 'loading'

  useEffect(() => {
    dispatch(fetchCurrencies('USD'))
  }, [])

  return (
    <>
    {isLoading ? 
      <LoadingPage/> :
      <MainPage/>
    }
    </>
  );
}

export default App;
