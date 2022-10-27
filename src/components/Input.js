import { FormControl, OutlinedInput, Typography, InputAdornment } from "@mui/material"

const Input = ({selected, amounts, changeAmount, isGive, setAmounts}) => {

  // Disable "e", "-" and "+" in inputs
  const disableSymbInput = (e) => {
    e.target.value = e.target.value.replace(/[e+-]/gi, "")
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">
            <Typography textTransform={'uppercase'}>{isGive ? selected.give : selected.take}</Typography>
          </InputAdornment>
        }
        type="number"
        name={isGive ? 'give' : 'take'}
        placeholder='0'
        value={isGive ? amounts.give : amounts.take}
        onChange={changeAmount}
        onInput={disableSymbInput}
        disabled={selected.give === selected.take}
      />
    </FormControl>
  )
}

export default Input