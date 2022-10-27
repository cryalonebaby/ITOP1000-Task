import { Box, Typography, styled } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';

const SelectContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '10px 0',
  background: theme.palette.cream.main,
  borderRadius: '20px',
  '&:hover': {
    cursor: 'pointer'
  }
}))

const SelectBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: '10px 0'
})

const Select = ({names, selected, isGive, changeTakeSelected, changeGiveSelected}) => {

  const changeSelected = isGive ? changeGiveSelected : changeTakeSelected // func depends on selected

  return (
    <SelectContainer>
      {names.map((name, i) => {
        const selectedName = isGive ? name === selected.give : name === selected.take

        if(selectedName) {
          return (
            <SelectBox 
              key={i} 
              gap={1} 
              bgcolor={'primary.main'} 
              borderRadius={2}
            >
              <CheckIcon color='cream'/>
              <Typography color='cream.main' textTransform={'uppercase'}>{name}</Typography>
            </SelectBox>
          )
        }
        return (
          <SelectBox 
            key={i}
            onClick={() => changeSelected(name)} 
          >
            <Typography textTransform={'uppercase'}>{name}</Typography>
          </SelectBox>
        )
      })}
    </SelectContainer>
  )
}

export default Select