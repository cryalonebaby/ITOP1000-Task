import { Box } from "@mui/material"
import Form from "../components/Form";
import Navbar from '../components/Navbar';

const MainPage = () => {
  return (
    <Box height={'100vh'}>
      <Navbar/>
      <Form/>
    </Box>
  )
}

export default MainPage