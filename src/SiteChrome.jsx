import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { colors } from './theme.js'

const links = [
  { label: 'Hakkımda', to: '/#hakkimda' },
  { label: 'Çalışma alanları', to: '/#alanlar' },
  { label: 'Yazılar', to: '/yazilar' },
  { label: 'Terapi süreci', to: '/#surec' },
  { label: 'İletişim', to: '/#iletisim' },
]

const contactEmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  'gokirmak.teoman@gmail.com',
)}&su=${encodeURIComponent(
  'Randevu ve bilgi talebi',
)}&body=${encodeURIComponent(
  'Merhaba,\n\nRandevu ve görüşme seçenekleri hakkında bilgi almak istiyorum.\n\nAd Soyad:\nTelefon:\n\nİyi günler.',
)}`

function Arrow({ light = false }) {
  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={{ ml: 1.25, color: light ? colors.cream : colors.green }}
    >
      ↗
    </Box>
  )
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: colors.sage,
        color: colors.green,
        boxShadow: '0 2px 12px rgba(13,61,51,0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          sx={{
            minHeight: { xs: 76, md: 91 },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            component={Link}
            to="/#anasayfa"
            onClick={closeMenu}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box
              sx={{
                width: 43,
                height: 43,
                border: `1px solid ${colors.green}`,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 17,
                letterSpacing: '-1px',
              }}
            >
              SY
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 20,
                  lineHeight: 1,
                }}
              >
                Selin Yılmaz
              </Typography>
              <Typography
                sx={{
                  mt: 0.7,
                  color: 'rgba(13,61,51,0.72)',
                  fontSize: 11,
                  letterSpacing: '1.1px',
                  textTransform: 'uppercase',
                }}
              >
                Klinik Psikolog
              </Typography>
            </Box>
          </Box>

          <Stack
            component="nav"
            aria-label="Ana navigasyon"
            direction="row"
            spacing={{ md: 3, lg: 4 }}
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
          >
            {links.map((link) => (
              <Box
                key={link.to}
                component={Link}
                to={link.to}
                sx={{
                  color: 'rgba(13,61,51,0.86)',
                  fontSize: 14,
                  letterSpacing: '0.2px',
                  textDecoration: 'none',
                  transition: 'color 180ms ease',
                  '&:hover': { color: colors.cream },
                }}
              >
                {link.label}
              </Box>
            ))}
            <Button
              component={Link}
              to="/#iletisim"
              variant="outlined"
              sx={{
                ml: 1,
                px: 2,
                py: 1,
                borderColor: 'rgba(13,61,51,0.55)',
                borderRadius: 0,
                color: colors.green,
                textTransform: 'none',
                fontSize: 14,
                '&:hover': {
                  borderColor: colors.green,
                  bgcolor: 'rgba(13,61,51,0.06)',
                },
              }}
            >
              Randevu bilgisi <Arrow />
            </Button>
          </Stack>

          <IconButton
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              color: colors.green,
              border: '1px solid rgba(13,61,51,0.45)',
              borderRadius: 0,
            }}
          >
            <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>
              {menuOpen ? '×' : '☰'}
            </Box>
          </IconButton>
        </Stack>
        {menuOpen && (
          <Stack
            component="nav"
            aria-label="Mobil navigasyon"
            spacing={0.5}
            sx={{ display: { xs: 'flex', md: 'none' }, pb: 2.5 }}
          >
            {links.map((link) => (
              <Box
                key={link.to}
                component={Link}
                to={link.to}
                onClick={closeMenu}
                sx={{
                  py: 1.3,
                  borderBottom: '1px solid rgba(13,61,51,0.18)',
                  color: colors.green,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Box>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  )
}

function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: colors.green, color: colors.cream, pt: { xs: 5, md: 6 } }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '1.5fr 1fr 1fr 1.2fr' },
            gap: { xs: 4, md: 5 },
            pb: 4,
          }}
        >
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 27,
              }}
            >
              Selin Yılmaz
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                color: 'rgba(247,246,241,0.68)',
                fontSize: 11,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Klinik Psikolog · Psikoterapi
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                mb: 1.5,
                color: colors.sage,
                fontSize: 12,
                letterSpacing: '1px',
              }}
            >
              KEŞFEDİN
            </Typography>
            <Stack spacing={1}>
              {links.slice(0, 4).map((link) => (
                <Box
                  key={link.to}
                  component={Link}
                  to={link.to}
                  sx={{
                    color: 'rgba(247,246,241,0.76)',
                    fontSize: 13,
                    textDecoration: 'none',
                    '&:hover': { color: colors.sage },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography
              sx={{
                mb: 1.5,
                color: colors.sage,
                fontSize: 12,
                letterSpacing: '1px',
              }}
            >
              GÖRÜŞMELER
            </Typography>
            <Stack spacing={1}>
              <Typography sx={{ color: 'rgba(247,246,241,0.76)', fontSize: 13 }}>
                Yüz yüze görüşme
              </Typography>
              <Typography sx={{ color: 'rgba(247,246,241,0.76)', fontSize: 13 }}>
                Online görüşme
              </Typography>
              <Typography sx={{ color: 'rgba(247,246,241,0.76)', fontSize: 13 }}>
                Randevu için iletişim
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Typography
              sx={{
                mb: 1.5,
                color: colors.sage,
                fontSize: 12,
                letterSpacing: '1px',
              }}
            >
              İLETİŞİM
            </Typography>
            <Typography
              sx={{
                color: 'rgba(247,246,241,0.76)',
                fontSize: 13,
                lineHeight: 1.8,
              }}
            >
              Randevu ve bilgi için
              <br />
              e-posta yoluyla ulaşabilirsiniz.
            </Typography>
            <Box
              component="a"
              href={contactEmailHref}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-block',
                mt: 1,
                color: colors.cream,
                fontSize: 13,
                textDecorationColor: colors.sage,
                textUnderlineOffset: 3,
              }}
            >
              E-posta gönder
            </Box>
          </Box>
        </Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            minHeight: 56,
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 1,
            borderTop: '1px solid rgba(247,246,241,0.2)',
          }}
        >
          <Typography sx={{ color: 'rgba(247,246,241,0.58)', fontSize: 11 }}>
            © {new Date().getFullYear()} Selin Yılmaz
          </Typography>
          <Typography sx={{ color: 'rgba(247,246,241,0.58)', fontSize: 11 }}>
            Bu site bilgilendirme amaçlıdır.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

function SiteLayout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: colors.cream,
        color: colors.green,
        fontFamily: 'Montserrat, Arial, sans-serif',
      }}
    >
      <SiteHeader />
      {children}
      <SiteFooter />
    </Box>
  )
}

export { Arrow, SiteLayout, contactEmailHref }
