import { AppBar, Box, styled, Toolbar, Typography } from "@mui/material"
import {useSelector} from 'react-redux'

const StyledToolbar = styled(Toolbar)({
	display: "flex",
	justifyContent: "center"
})

const Navbar = () => {
	const {currencies} = useSelector(state => state.currencies)
	
	const UsdToUah = (currencies.USD * currencies.UAH).toFixed(2)
	const EurToUah = (currencies.EUR * currencies.UAH).toFixed(2)
	
	return (
		<AppBar position="sticky">
				<StyledToolbar>
						<Box display={'flex'} justifyContent={'space-between'} gap={10}>
							<Typography variant="p">
								<Typography variant="span">1 USD = </Typography>
								<Typography variant="span">{UsdToUah} UAH</Typography>
							</Typography>
							<Typography variant="p">
								<Typography variant="span">1 EUR = </Typography>
								<Typography variant="span">{EurToUah} UAH</Typography>
							</Typography>
						</Box>
				</StyledToolbar>
		</AppBar>
	)
}

export default Navbar