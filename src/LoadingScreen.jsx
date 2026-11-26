import { Box, CircularProgress } from '@mui/material'
import { colors } from './theme.js'

function LoadingScreen({ label }) {
  return (
    <Box
      role="status"
      aria-label={label}
      sx={{
        width: '100%',
        minHeight: 300,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <CircularProgress size={44} sx={{ color: colors.green }} />
    </Box>
  )
}

export default LoadingScreen
