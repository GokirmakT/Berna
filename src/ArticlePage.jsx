import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { SiteLayout } from './SiteChrome.jsx'
import { colors } from './theme.js'
import { useArticle } from './useArticles.js'

function ArticlePage() {
  const { slug } = useParams()
  const { article, loading, error } = useArticle(slug)

  if (!loading && !error && !article) {
    return <NotFoundPage />
  }

  return (
    <SiteLayout>
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 5, md: 9 } }}>
        {loading && (
          <Container maxWidth="md">
            <Typography sx={{ color: colors.muted }}>Yazı yükleniyor...</Typography>
          </Container>
        )}
        {error && (
          <Container maxWidth="md">
            <Alert severity="error">Yazı yüklenemedi: {error}</Alert>
          </Container>
        )}
        {article && <Container maxWidth="md">
          <Button
            component={Link}
            to="/yazilar"
            sx={{
              mb: { xs: 3, md: 4 },
              px: 0,
              color: colors.green,
              fontSize: 12,
              textTransform: 'none',
              '&:hover': { bgcolor: 'transparent', color: colors.muted },
            }}
          >
            ← Tüm yazılar
          </Button>

          <Typography
            sx={{
              color: colors.muted,
              fontSize: 10,
              letterSpacing: '1.4px',
              textTransform: 'uppercase',
            }}
          >
            {article.category} · {article.readingTime}
          </Typography>
          <Typography
            component="h1"
            sx={{
              mt: 1.5,
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: { xs: 42, md: 58 },
              fontWeight: 400,
              lineHeight: 1.08,
            }}
          >
            {article.title}
          </Typography>
          <Typography
            sx={{
              mt: 2,
              color: colors.muted,
              fontSize: { xs: 14, md: 16 },
              lineHeight: 1.9,
            }}
          >
            {article.excerpt}
          </Typography>
          <Box
            component="img"
            src={article.image}
            alt={article.imageAlt}
            sx={{
              display: 'block',
              width: '100%',
              aspectRatio: '3 / 2',
              mt: { xs: 3, md: 5 },
              objectFit: 'cover',
              borderRadius: '4px',
              filter: 'saturate(0.82)',
            }}
          />
          <Box sx={{ maxWidth: 690, mx: 'auto', mt: { xs: 3, md: 5 } }}>
            {article.paragraphs.map((paragraph) => (
              <Typography
                key={paragraph}
                component="p"
                sx={{
                  mb: 2.5,
                  color: colors.muted,
                  fontSize: { xs: 14, md: 16 },
                  lineHeight: 2,
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ justifyContent: 'center', mt: { xs: 4, md: 6 } }}
          >
            <Button
              component={Link}
              to="/yazilar"
              variant="outlined"
              sx={{
                px: 2.5,
                py: 1.25,
                borderColor: colors.green,
                borderRadius: 0,
                color: colors.green,
                fontSize: 12,
                textTransform: 'none',
              }}
            >
              Diğer yazılar
            </Button>
            <Button
              component={Link}
              to="/#iletisim"
              variant="contained"
              disableElevation
              sx={{
                px: 2.5,
                py: 1.25,
                bgcolor: colors.green,
                borderRadius: 0,
                color: colors.cream,
                fontSize: 12,
                textTransform: 'none',
                '&:hover': { bgcolor: '#145246' },
              }}
            >
              İletişim
            </Button>
          </Stack>
        </Container>}
      </Box>
    </SiteLayout>
  )
}

function NotFoundPage() {
  return (
    <SiteLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: 320,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 42,
              fontWeight: 400,
            }}
          >
            Yazı bulunamadı
          </Typography>
          <Button
            component={Link}
            to="/yazilar"
            sx={{ mt: 1, color: colors.green, textTransform: 'none' }}
          >
            Yazılara dön
          </Button>
        </Box>
      </Box>
    </SiteLayout>
  )
}

export { ArticlePage, NotFoundPage }
