import { Box } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';

const LoadingPage = () => {
  return (
    <Box 
      display={'flex'} 
      justifyContent={'center'} 
      alignItems={'center'}
      height={'100vh'} 
      bgcolor={'primary.main'}
    >
      <CircularProgress color={'cream'} size={80}/>
    </Box>
  )
}

export default LoadingPage