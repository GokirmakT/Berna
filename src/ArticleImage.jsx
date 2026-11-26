import { Box } from '@mui/material'

function ArticleImage({ src, alt, loading, sx }) {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '3 / 2',
        overflow: 'hidden',
        borderRadius: '4px',
        ...sx,
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={loading}
        sx={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'saturate(0.82)',
        }}
      />
    </Box>
  )
}

export default ArticleImage
