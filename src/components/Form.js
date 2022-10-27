import {useState} from 'react'
import { Box, Typography, Button, styled } from "@mui/material"
import SwapHorizSharpIcon from '@mui/icons-material/SwapHorizSharp';
import Input from './Input';
import Select from './Select';
import {useSelector} from 'react-redux'

const StyledForm = styled(Box)({
  display: 'flex', 
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  marginTop: '100px'
})

const FormWrapper = styled(Box)({
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center',
  maxHeight: '300px'
})

const SwapWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
})

const StyledButton = styled(Button)({
  margin: '30px',
  padding: '15px 0',
  width: '100px',
  borderRadius: '10px'
})

const Form = () => {

  const {currencies} = useSelector(state => state.currencies) // Object with currencies from API

  const names = Object.keys(currencies) // Array of currencies name
  
  const [selected, setSelected] = useState({
    give: 'EUR',
    take: 'UAH'
  })
  
  const [amounts, setAmounts] = useState({
    give: 0,
    take: 0
  })

  const errors = !amounts.give || !amounts.take || selected.give === selected.take

  const givePrice = currencies[selected.give]
  const takePrice = currencies[selected.take]

  // Count amounts while changing inputs
  const changeAmount = (e) => {
    const {value, name} = e.target

    if(name === 'give') {
      let takeAmount = (value * givePrice * takePrice)
      if(selected.give === 'UAH') {
        takeAmount = (value / givePrice / takePrice) // divide if uah (usd is a base )
      }
      
      setAmounts({give: +value, take: +takeAmount.toFixed(2)}) // convert string to num with "+"
    }

    if(name === 'take') { 
      let giveAmount = (value / givePrice / takePrice)
      if(selected.give === 'UAH') {
        giveAmount = (value * givePrice * takePrice) // divide if uah (usd is a base )
      }

      setAmounts({take: +value, give: +giveAmount.toFixed(2)})
    }

  }

  // recalculate amounts while changing give input
  const changeGiveSelected = (currencyName) => {
    let newPrice = (amounts.take / takePrice / currencies[currencyName]).toFixed(2) // recalculate
    if(currencyName === 'UAH') {
      newPrice = (amounts.take * takePrice * currencies[currencyName]).toFixed(2)
    }
    if(currencyName === selected.take) {
      newPrice = amounts.take
    }

    setAmounts(prev => ({...prev, give: newPrice}))
    setSelected(prev => ({...prev, give: currencyName}))
  }

  // recalculate amounts while changing take input
  const changeTakeSelected = (currencyName) => {
    let newPrice = (amounts.give * currencies[currencyName] / givePrice).toFixed(2) // recalculate
    if(currencyName === 'UAH') {
      newPrice = (amounts.take * takePrice * currencies[currencyName]).toFixed(2)
    }
    if(currencyName === selected.give) {
      newPrice = amounts.give
    }

    setAmounts(prev => ({...prev, take: newPrice}))
    setSelected(prev => ({...prev, take: currencyName}))
  }

  // swap with change give and take selected
  const swapTokens = () => {
    changeGiveSelected(selected.take)
    changeTakeSelected(selected.give)
  }

  return (
    <StyledForm>
      <FormWrapper>
        <Box display={'flex'} gap={3}>
          
          {/*INPUT #1 */}
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Input 
              selected={selected} 
              amounts={amounts} 
              changeAmount={changeAmount} 
              isGive={true}
            />
            <Select 
              isGive={true} 
              names={names} 
              selected={selected} 
              changeGiveSelected={changeGiveSelected}
            />
          </Box>

          {/*SWAP */}
          <SwapWrapper>
            <Box 
              bgcolor={'primary.main'} 
              borderRadius={2} 
              onClick={swapTokens}
            >
              <SwapHorizSharpIcon fontSize='large' color='white'/>
            </Box>
          </SwapWrapper>

          {/*INPUT #2 */}
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Input 
              selected={selected} 
              amounts={amounts} 
              changeAmount={changeAmount} 
              isGive={false}
            />
            <Select 
              isGive={false} 
              names={names} 
              selected={selected} 
              changeTakeSelected={changeTakeSelected}
            />
          </Box>

        </Box>
        <StyledButton 
          disabled={errors} 
          variant='contained' 
        >
          <Typography fontWeight={300} fontSize={'18px'}>Submit</Typography>
        </StyledButton>
      </FormWrapper>
    </StyledForm>
  )
}

export default Form