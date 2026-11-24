import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

const colors = {
  green: '#0D3D33',
  cream: '#F7F6F1',
  sage: '#ADCDB8',
  sageLight: '#E6ECE4',
  muted: '#64736D',
  line: 'rgba(13, 61, 51, 0.18)',
}

const links = [
  { label: 'Hakkımda', href: '#hakkimda' },
  { label: 'Çalışma alanları', href: '#alanlar' },
  { label: 'Terapi süreci', href: '#surec' },
  { label: 'İletişim', href: '#iletisim' },
]

const services = [
  {
    number: '01',
    title: 'Bireysel terapi',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&h=600&crop=faces&q=85',
    imageAlt: 'Bireysel terapi çalışma alanını temsil eden fotoğraf',
    description:
      'Yetişkinlerle bireysel görüşmelerde duygu durumu, yaşam olayları ve terapi hedefleri ele alınır.',
    note: 'Yetişkinlerle çalışma',
  },
  {
    number: '02',
    title: 'Kaygı ve stres',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&h=600&q=85',
    imageAlt: 'Sakinleşme ve stres yönetimini temsil eden fotoğraf',
    description:
      'Kaygı belirtileri ve stresin günlük yaşama etkileri değerlendirilir; çalışma hedefleri görüşmelerde belirlenir.',
    note: 'Kaygı belirtileri',
  },
  {
    number: '03',
    title: 'İlişkiler',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&h=600&q=85',
    imageAlt: 'Yakın ilişkileri ve sosyal bağı temsil eden fotoğraf',
    description:
      'Yakın ilişkilerde iletişim, sınırlar ve tekrar eden ilişki örüntüleri üzerinde çalışılır.',
    note: 'İlişki dinamikleri',
  },
]

const steps = [
  {
    number: '01',
    title: 'İlk görüşme',
    description:
      'Başvuru nedeninizi, ihtiyaçlarınızı ve terapi sürecine ilişkin sorularınızı görüşürüz.',
  },
  {
    number: '02',
    title: 'Değerlendirme',
    description:
      'Görüşmelerin hedefleri ve çalışma çerçevesi ihtiyaçlarınıza göre belirlenir.',
  },
  {
    number: '03',
    title: 'Düzenli görüşmeler',
    description:
      'Belirlenen aralıklarla görüşülür ve terapi hedefleri süreç boyunca gözden geçirilir.',
  },
]

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: colors.cream,
        color: colors.green,
        fontFamily: 'Montserrat, Arial, sans-serif',
      }}
    >
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
              component="a"
              href="#anasayfa"
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
                    fontSize: 9,
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
                  key={link.href}
                  component="a"
                  href={link.href}
                  sx={{
                    color: 'rgba(13,61,51,0.86)',
                    fontSize: 12,
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
                component="a"
                href="#iletisim"
                variant="outlined"
                sx={{
                  ml: 1,
                  px: 2,
                  py: 1,
                  borderColor: 'rgba(13,61,51,0.55)',
                  borderRadius: 0,
                  color: colors.green,
                  textTransform: 'none',
                  fontSize: 12,
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
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={closeMenu}
                  sx={{
                    py: 1.3,
                    borderBottom: '1px solid rgba(13,61,51,0.18)',
                    color: colors.green,
                    fontSize: 13,
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

      <Box
        component="main"
        sx={{ '& section': { scrollMarginTop: { xs: '84px', md: '100px' } } }}
      >
        <Box
          component="section"
          id="anasayfa"
          sx={{
            position: 'relative',
            overflow: 'hidden',
            bgcolor: colors.green,
            color: colors.cream,
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 0.88fr' },
                alignItems: 'center',
                gap: { xs: 5, md: 8, lg: 11 },
                minHeight: { md: 620 },
                py: { xs: 6, sm: 8, md: 7 },
              }}
            >
              <Stack sx={{ order: { xs: 2, md: 1 }, maxWidth: 570 }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: 'center', mb: { xs: 2.5, md: 3 } }}
                >
                  <Box sx={{ width: 31, height: 1, bgcolor: colors.sage }} />
                  <Typography
                    sx={{
                      color: colors.sage,
                      fontSize: 10,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Psikoterapi · İstanbul ve online
                  </Typography>
                </Stack>
                <Typography
                  component="h1"
                  sx={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 400,
                    fontSize: { xs: 51, sm: 65, md: 70, lg: 78 },
                    lineHeight: { xs: 0.99, md: 0.98 },
                    letterSpacing: '-2.1px',
                  }}
                >
                  Bireysel
                  <br />
                  <Box component="span" sx={{ color: colors.sage, fontStyle: 'italic' }}>
                    terapi
                  </Box>
                  <br />
                  görüşmeleri
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 420,
                    mt: 2.5,
                    color: 'rgba(247,246,241,0.78)',
                    fontSize: { xs: 14, sm: 15 },
                    lineHeight: 1.9,
                  }}
                >
                  Yetişkinlerle bireysel terapi görüşmeleri. İstanbul'da yüz yüze
                  ve online seans seçenekleri hakkında bilgi alın.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{
                    mt: 3.5,
                    alignItems: { xs: 'stretch', sm: 'center' },
                    maxWidth: { xs: 290, sm: 'none' },
                  }}
                >
                  <Button
                    component="a"
                    href="#iletisim"
                    variant="contained"
                    disableElevation
                    sx={{
                      px: 2.5,
                      py: 1.5,
                      bgcolor: colors.sage,
                      borderRadius: 0,
                      color: colors.green,
                      textTransform: 'none',
                      fontSize: 12,
                      '&:hover': { bgcolor: '#c4dbc9' },
                    }}
                  >
                    İlk görüşme hakkında <Arrow />
                  </Button>
                  <Button
                    component="a"
                    href="#yaklasim"
                    sx={{
                      px: 1.5,
                      py: 1.4,
                      justifyContent: 'flex-start',
                      color: colors.cream,
                      textTransform: 'none',
                      fontSize: 12,
                      '&:hover': { bgcolor: 'transparent', color: colors.sage },
                    }}
                  >
                    Terapi yaklaşımı <Box component="span" sx={{ ml: 1 }}>↓</Box>
                  </Button>
                </Stack>
              </Stack>

              <Box
                sx={{
                  position: 'relative',
                  order: { xs: 1, md: 2 },
                  justifySelf: { xs: 'center', md: 'end' },
                  width: '100%',
                  maxWidth: 450,
                  pr: { xs: 1, sm: 2 },
                  pb: 2,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '8%',
                    right: 0,
                    width: '83%',
                    height: '87%',
                    border: '1px solid rgba(173,205,184,0.5)',
                    borderRadius: '48% 48% 0 0',
                  }}
                />
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=85"
                  alt="Doğal ışıkta portre"
                  sx={{
                    position: 'relative',
                    display: 'block',
                    width: '83%',
                    height: { xs: 330, sm: 410, md: 480 },
                    objectFit: 'cover',
                    objectPosition: 'center 38%',
                    borderRadius: '48% 48% 0 0',
                    filter: 'saturate(0.82)',
                  }}
                />
                <Paper
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    right: { xs: 0, sm: 2 },
                    bottom: { xs: 28, md: 48 },
                    width: { xs: 190, sm: 220 },
                    px: 2.2,
                    py: 1.8,
                    borderRadius: 0,
                    bgcolor: colors.cream,
                    color: colors.green,
                    boxShadow: '0 12px 35px rgba(0,0,0,0.16)',
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
                    Görüşme biçimi
                  </Typography>
                  <Typography sx={{ mt: 0.6, fontSize: 12, fontWeight: 600 }}>
                    Yüz yüze ve online
                  </Typography>
                </Paper>
                <Box
                  component="svg"
                  viewBox="0 0 100 130"
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: { xs: -4, md: -25 },
                    width: 58,
                    height: 78,
                    fill: 'none',
                    stroke: colors.sage,
                    strokeWidth: 0.7,
                    opacity: 0.8,
                  }}
                >
                  <path d="M50 126C48 89 47 50 51 7M49 32C34 28 26 19 25 7c14 2 23 10 24 25Zm1 16c14-3 23-11 25-23-14 1-23 8-25 23Zm-2 17c-15-2-24-9-28-21 15 0 25 6 28 21Zm2 17c15-3 24-10 27-22-15 1-24 7-27 22Z" />
                </Box>
              </Box>
            </Box>
          </Container>
          <Box sx={{ height: 9, bgcolor: colors.sage }} />
        </Box>

        <Box component="section" sx={{ bgcolor: colors.sage, py: { xs: 2.5, md: 3 } }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              {[
                'Bireysel terapi',
                'Kaygı ve stres',
                'İlişki dinamikleri',
              ].map((text, index) => (
                <Stack
                  key={text}
                  direction="row"
                  spacing={1.25}
                  sx={{ alignItems: 'center' }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: 13,
                      fontStyle: 'italic',
                    }}
                  >
                    0{index + 1}
                  </Typography>
                  <Typography sx={{ fontSize: 11, letterSpacing: '0.25px' }}>
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Container>
        </Box>

        <Box component="section" id="yaklasim" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.05fr' },
                alignItems: 'center',
                gap: { xs: 5, md: 9, lg: 12 },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 480,
                  justifySelf: { xs: 'center', md: 'start' },
                  pb: { xs: 2, md: 3 },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: { xs: '18px 0 0 18px', md: '25px 0 0 25px' },
                    bgcolor: colors.sageLight,
                  }}
                />
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85"
                  alt="Sıcak tonlarda, doğal ışık alan bir yaşam alanı"
                  sx={{
                    position: 'relative',
                    display: 'block',
                    width: '92%',
                    height: { xs: 300, sm: 390, md: 435 },
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'saturate(0.78)',
                  }}
                />
                <Paper
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    left: { xs: 0, md: -16 },
                    bottom: 0,
                    px: 2,
                    py: 1.5,
                    bgcolor: colors.green,
                    color: colors.cream,
                    borderRadius: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 9,
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Görüşme biçimi
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.4,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                      Yüz yüze ve online
                  </Typography>
                </Paper>
              </Box>

              <Stack sx={{ maxWidth: 540 }}>
                <Typography
                  sx={{
                    mb: 1.5,
                    color: colors.muted,
                    fontSize: 9,
                    letterSpacing: '1.7px',
                    textTransform: 'uppercase',
                  }}
                >
                  Terapi yaklaşımı
                </Typography>
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: { xs: 42, md: 53 },
                    fontWeight: 400,
                    lineHeight: 1.04,
                    letterSpacing: '-1px',
                  }}
                >
                  Çalışma biçimim
                </Typography>
                <Typography
                  sx={{
                    mt: 2.5,
                    color: colors.muted,
                    fontSize: 14,
                    lineHeight: 2,
                  }}
                >
                  Görüşmelerde başvuru nedenini, bu durumun günlük yaşama
                  etkilerini ve terapi hedeflerini ele alıyorum. Görüşme
                  içerikleri, danışanın ihtiyaçlarına göre belirleniyor.
                </Typography>
                <Typography
                  sx={{
                    mt: 1.5,
                    color: colors.muted,
                    fontSize: 14,
                    lineHeight: 2,
                  }}
                >
                  Çalışmalarımı mesleki etik ilkeler ve bilimsel bilgi
                  doğrultusunda yürütüyorum. Terapi hedeflerini ve süreci
                  düzenli olarak danışanla birlikte değerlendiriyorum.
                </Typography>
                <Button
                  component="a"
                  href="#surec"
                  sx={{
                    alignSelf: 'flex-start',
                    mt: 2.5,
                    p: 0,
                    color: colors.green,
                    fontSize: 13,
                    textTransform: 'none',
                    '&:hover': { bgcolor: 'transparent', color: colors.muted },
                  }}
                >
                  Terapi süreci <Arrow />
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>

        <Box
          component="section"
          id="hakkimda"
          sx={{ py: { xs: 7, md: 10 }, bgcolor: colors.sageLight }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '0.72fr 1.28fr' },
                alignItems: 'start',
                gap: { xs: 4, md: 7, lg: 9 },
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85"
                alt="Portre fotoğrafı"
                sx={{
                  display: 'block',
                  width: '100%',
                  maxWidth: { xs: 420, md: 360 },
                  height: { xs: 360, sm: 430, md: 470 },
                  justifySelf: { xs: 'center', md: 'start' },
                  objectFit: 'cover',
                  objectPosition: 'center 35%',
                  borderRadius: '12px',
                }}
              />
              <Stack sx={{ maxWidth: 720 }}>
                <Typography
                  sx={{
                    mb: 1,
                    color: colors.muted,
                    fontSize: 9,
                    letterSpacing: '1.8px',
                    textTransform: 'uppercase',
                  }}
                >
                  Klinik psikolog
                </Typography>
                <Typography
                  component="h2"
                  sx={{
                    mb: 2,
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: { xs: 39, md: 48 },
                    fontWeight: 400,
                    lineHeight: 1.08,
                  }}
                >
                  Selin Yılmaz
                </Typography>
                <Typography
                  sx={{ color: colors.green, fontSize: 14, fontWeight: 600, lineHeight: 1.8 }}
                >
                  Yetişkinlerle bireysel terapi görüşmeleri yürütüyorum.
                </Typography>
                <Typography
                  sx={{ mt: 1.75, color: colors.muted, fontSize: 13, lineHeight: 1.9 }}
                >
                  Görüşmelerde kaygı, stres, ilişkiler ve öz farkındalık konuları
                  ele alınır. Çalışma hedefleri, danışanın başvuru nedeni ve
                  ihtiyaçları doğrultusunda belirlenir.
                </Typography>
                <Typography
                  sx={{ mt: 1.5, color: colors.muted, fontSize: 13, lineHeight: 1.9 }}
                >
                  Terapi sürecini mesleki etik ilkeler ve bilimsel bilgi
                  doğrultusunda yürütüyorum. Görüşmeler yüz yüze veya online
                  olarak planlanabilir.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{
                    mt: 2.5,
                    pt: 2,
                    gap: { xs: 1.5, sm: 4 },
                    borderTop: `1px solid ${colors.line}`,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        mb: 0.5,
                        color: colors.muted,
                        fontSize: 9,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Çalışma alanları
                    </Typography>
                    <Typography sx={{ fontSize: 11, lineHeight: 1.7 }}>
                      Bireysel terapi · Kaygı ve stres · İlişkiler
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        mb: 0.5,
                        color: colors.muted,
                        fontSize: 9,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Görüşme biçimi
                    </Typography>
                    <Typography sx={{ fontSize: 11, lineHeight: 1.7 }}>
                      Yüz yüze ve online
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  component="a"
                  href="#alanlar"
                  sx={{
                    alignSelf: 'flex-start',
                    mt: 2.5,
                    p: 0,
                    color: colors.green,
                    fontSize: 12,
                    textTransform: 'none',
                    '&:hover': { bgcolor: 'transparent', color: colors.muted },
                  }}
                >
                  Çalışma alanları <Arrow />
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>

        <Box component="section" id="alanlar" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              sx={{
                alignItems: { xs: 'flex-start', md: 'end' },
                justifyContent: 'space-between',
                gap: 2.5,
                mb: { xs: 4, md: 5 },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    mb: 1.25,
                    color: colors.muted,
                    fontSize: 9,
                    letterSpacing: '1.7px',
                    textTransform: 'uppercase',
                  }}
                >
                  Çalışma alanları
                </Typography>
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: { xs: 40, md: 52 },
                    fontWeight: 400,
                    lineHeight: 1.05,
                  }}
                >
                  Terapi çalışma alanları
                </Typography>
              </Box>
              <Typography
                sx={{
                  maxWidth: 350,
                  color: colors.muted,
                  fontSize: 13,
                  lineHeight: 1.9,
                }}
              >
                Bireysel terapi görüşmelerinde ele alınabilecek konular ve
                çalışma biçimleri aşağıda yer alıyor.
              </Typography>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                borderTop: `1px solid ${colors.line}`,
                borderBottom: `1px solid ${colors.line}`,
              }}
            >
              {services.map((service, index) => (
                <Box
                  key={service.number}
                  sx={{
                    px: { xs: 0, md: 3.2 },
                    py: { xs: 3, md: 3.5 },
                    borderRight: {
                      md: index < services.length - 1 ? `1px solid ${colors.line}` : 'none',
                    },
                    borderBottom: {
                      xs: index < services.length - 1 ? `1px solid ${colors.line}` : 'none',
                      md: 'none',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    sx={{
                      display: 'block',
                      width: '100%',
                      aspectRatio: '3 / 2',
                      height: 'auto',
                      mb: 2.5,
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '6px',
                      filter: 'saturate(0.82)',
                    }}
                  />
                  <Stack
                    direction="row"
                    sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Typography
                      sx={{
                        color: colors.muted,
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        fontSize: 17,
                        fontStyle: 'italic',
                      }}
                    >
                      {service.number}
                    </Typography>
                    <Box
                      sx={{
                        width: 33,
                        height: 33,
                        border: `1px solid ${colors.line}`,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        color: colors.green,
                        fontSize: 14,
                      }}
                    >
                      ↗
                    </Box>
                  </Stack>
                  <Typography
                    component="h3"
                    sx={{
                      mt: 3,
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: 29,
                      fontWeight: 500,
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    sx={{
                      minHeight: { md: 82 },
                      mt: 1,
                      color: colors.muted,
                      fontSize: 11,
                      lineHeight: 1.9,
                    }}
                  >
                    {service.description}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      color: colors.green,
                      fontSize: 10,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {service.note}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        <Box
          component="section"
          id="surec"
          sx={{ py: { xs: 8, md: 11 }, bgcolor: colors.green, color: colors.cream }}
        >
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              sx={{
                alignItems: { xs: 'flex-start', md: 'end' },
                justifyContent: 'space-between',
                gap: 2,
                mb: { xs: 4, md: 6 },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    mb: 1.25,
                    color: colors.sage,
                    fontSize: 9,
                    letterSpacing: '1.8px',
                    textTransform: 'uppercase',
                  }}
                >
                  Görüşme düzeni
                </Typography>
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: { xs: 40, md: 53 },
                    fontWeight: 400,
                    lineHeight: 1.05,
                  }}
                >
                  Terapi süreci nasıl ilerler?
                </Typography>
              </Box>
            </Stack>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                borderTop: '1px solid rgba(247,246,241,0.26)',
                borderBottom: '1px solid rgba(247,246,241,0.26)',
              }}
            >
              {steps.map((step, index) => (
                <Box
                  key={step.number}
                  sx={{
                    py: { xs: 3, md: 3.5 },
                    px: { xs: 0, md: 3.5 },
                    borderRight: {
                      md: index < steps.length - 1 ? '1px solid rgba(247,246,241,0.26)' : 'none',
                    },
                    borderBottom: {
                      xs: index < steps.length - 1 ? '1px solid rgba(247,246,241,0.26)' : 'none',
                      md: 'none',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: colors.sage,
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: 15,
                      fontStyle: 'italic',
                    }}
                  >
                    {step.number} <Box component="span" sx={{ opacity: 0.55 }}>—</Box>
                  </Typography>
                  <Typography
                    component="h3"
                    sx={{
                      mt: 2,
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: 27,
                      fontWeight: 500,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1,
                      color: 'rgba(247,246,241,0.7)',
                      fontSize: 13,
                      lineHeight: 1.9,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        <Box
          component="section"
          id="iletisim"
          sx={{
            py: { xs: 8, md: 11 },
            bgcolor: colors.sage,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography
              sx={{
                color: colors.green,
                fontSize: 9,
                letterSpacing: '1.7px',
                textTransform: 'uppercase',
              }}
            >
              Randevu ve bilgi
            </Typography>
            <Typography
              component="h2"
              sx={{
                mt: 1.5,
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: { xs: 41, md: 57 },
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              İletişim
            </Typography>
            <Typography
              sx={{
                maxWidth: 480,
                mx: 'auto',
                mt: 1.75,
                color: 'rgba(13,61,51,0.78)',
                fontSize: 13,
                lineHeight: 1.9,
              }}
            >
              Randevu talebi ve görüşme seçenekleri hakkında bilgi almak için
              e-posta yoluyla iletişime geçebilirsiniz.
            </Typography>
            <Button
              component="a"
              href="mailto:merhaba@selinyilmaz.com"
              variant="contained"
              disableElevation
              sx={{
                mt: 3,
                px: 2.5,
                py: 1.45,
                bgcolor: colors.green,
                borderRadius: 0,
                color: colors.cream,
                textTransform: 'none',
                fontSize: 13,
                '&:hover': { bgcolor: '#145246' },
              }}
            >
              İletişime geçin <Arrow light />
            </Button>
          </Container>
        </Box>
      </Box>

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
                  fontSize: 9,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Klinik Psikolog · Psikoterapi
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ mb: 1.5, color: colors.sage, fontSize: 10, letterSpacing: '1px' }}>
                KEŞFEDİN
              </Typography>
              <Stack spacing={1}>
                {links.slice(0, 3).map((link) => (
                  <Box
                    key={link.href}
                    component="a"
                    href={link.href}
                    sx={{
                      color: 'rgba(247,246,241,0.76)',
                      fontSize: 11,
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
              <Typography sx={{ mb: 1.5, color: colors.sage, fontSize: 10, letterSpacing: '1px' }}>
                GÖRÜŞMELER
              </Typography>
              <Stack spacing={1}>
                <Typography sx={{ color: 'rgba(247,246,241,0.76)', fontSize: 11 }}>
                  Yüz yüze görüşme
                </Typography>
                <Typography sx={{ color: 'rgba(247,246,241,0.76)', fontSize: 11 }}>
                  Online görüşme
                </Typography>
                <Typography sx={{ color: 'rgba(247,246,241,0.76)', fontSize: 11 }}>
                  Randevu için iletişim
                </Typography>
              </Stack>
            </Box>
            <Box>
              <Typography sx={{ mb: 1.5, color: colors.sage, fontSize: 10, letterSpacing: '1px' }}>
                İLETİŞİM
              </Typography>
              <Typography sx={{ color: 'rgba(247,246,241,0.76)', fontSize: 11, lineHeight: 1.8 }}>
                Randevu ve bilgi için
                <br />
                e-posta yoluyla ulaşabilirsiniz.
              </Typography>
              <Box
                component="a"
                href="mailto:merhaba@selinyilmaz.com"
                sx={{
                  display: 'inline-block',
                  mt: 1,
                  color: colors.cream,
                  fontSize: 11,
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
            <Typography sx={{ color: 'rgba(247,246,241,0.58)', fontSize: 9 }}>
              © {new Date().getFullYear()} Selin Yılmaz
            </Typography>
            <Typography sx={{ color: 'rgba(247,246,241,0.58)', fontSize: 9 }}>
              Bu site bilgilendirme amaçlıdır.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default App
