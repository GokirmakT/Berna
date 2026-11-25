import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { SiteLayout } from './SiteChrome.jsx'
import { colors } from './theme.js'
import { useArticles } from './useArticles.js'

function ArticlesPage() {
  const { articles, loading, error } = useArticles()

  return (
    <SiteLayout>
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              mb: 1.25,
              color: colors.muted,
              fontSize: 9,
              letterSpacing: '1.7px',
              textTransform: 'uppercase',
            }}
          >
            Notlar ve yazılar
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: { xs: 42, md: 56 },
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            Tüm yazılar
          </Typography>
          <Typography
            sx={{
              maxWidth: 480,
              mt: 1.75,
              color: colors.muted,
              fontSize: 13,
              lineHeight: 1.9,
            }}
          >
            Terapi süreci, duygular ve ilişkiler üzerine yazılar.
          </Typography>

          <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ mt: { xs: 4, md: 5 } }}>
            {loading && (
              <Typography sx={{ color: colors.muted }}>
                Yazılar yükleniyor...
              </Typography>
            )}
            {error && (
              <Alert severity="error">Yazılar yüklenemedi: {error}</Alert>
            )}
            {!loading && !error && articles.length === 0 && (
              <Typography sx={{ color: colors.muted }}>
                Henüz yayımlanmış yazı bulunmuyor.
              </Typography>
            )}
            {articles.map((article) => (
              <Box
                key={article.id}
                component="article"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
                  gap: { xs: 2, md: 3.5 },
                  p: { xs: 2, md: 2.5 },
                  bgcolor: colors.sageLight,
                  border: `1px solid ${colors.line}`,
                }}
              >
                <Box
                  component="img"
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  sx={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '3 / 2',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    filter: 'saturate(0.82)',
                  }}
                />
                <Stack sx={{ alignItems: 'flex-start', py: { md: 0.5 } }}>
                  <Stack
                    direction="row"
                    sx={{
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors.green,
                        fontSize: 9,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {article.category}
                    </Typography>
                    <Typography
                      sx={{ flexShrink: 0, color: colors.muted, fontSize: 10 }}
                    >
                      {article.readingTime}
                    </Typography>
                  </Stack>
                  <Typography
                    component="h2"
                    sx={{
                      mt: 1.5,
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: { xs: 27, md: 32 },
                      fontWeight: 500,
                      lineHeight: 1.15,
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1,
                      color: colors.muted,
                      fontSize: 12,
                      lineHeight: 1.85,
                    }}
                  >
                    {article.excerpt}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/yazilar/${article.id}`}
                    sx={{
                      mt: 'auto',
                      pt: 2,
                      px: 0,
                      color: colors.green,
                      fontSize: 11,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: 'transparent',
                        color: colors.muted,
                      },
                    }}
                  >
                    Yazıyı oku
                    <Box component="span" aria-hidden="true" sx={{ ml: 1.25 }}>
                      ↗
                    </Box>
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
    </SiteLayout>
  )
}

export default ArticlesPage
