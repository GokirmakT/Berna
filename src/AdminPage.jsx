import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { supabase } from './supabase.js'
import { SiteLayout } from './SiteChrome.jsx'
import { colors } from './theme.js'
import { mapArticle } from './useArticles.js'

const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const maxImageSize = 5 * 1024 * 1024

function getArticleKey(article) {
  return article.dbId || article.localId
}

function makeNewSlug(articles) {
  let suffix = 1
  let slug = 'yeni-yazi'

  while (articles.some((article) => article.id === slug)) {
    suffix += 1
    slug = `yeni-yazi-${suffix}`
  }

  return slug
}

function getErrorMessage(error) {
  return typeof error?.message === 'string'
    ? error.message
    : 'Beklenmeyen bir hata oluştu.'
}

function AdminPage() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(Boolean(supabase))
  const [adminStatus, setAdminStatus] = useState('none')
  const [adminCheckUserId, setAdminCheckUserId] = useState('')
  const [articles, setArticles] = useState([])
  const [articlesLoadedUserId, setArticlesLoadedUserId] = useState('')
  const [selectedKey, setSelectedKey] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const selectedArticle = articles.find(
    (article) => getArticleKey(article) === selectedKey,
  )
  const sessionUserId = session?.user.id
  const adminCheckPending =
    Boolean(sessionUserId) && adminCheckUserId !== sessionUserId
  const isAdmin =
    Boolean(sessionUserId) &&
    adminStatus === 'allowed' &&
    adminCheckUserId === sessionUserId
  const articlesLoading =
    isAdmin && articlesLoadedUserId !== sessionUserId

  useEffect(() => {
    if (!supabase) {
      return undefined
    }

    let active = true
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(nextSession)
        setAuthLoading(false)
        setError('')
        if (_event === 'SIGNED_IN' || _event === 'SIGNED_OUT') {
          setAdminStatus('none')
          setAdminCheckUserId('')
          setArticlesLoadedUserId('')
          setArticles([])
          setSelectedKey('')
        }
      }
    })

    supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (!active) {
          return
        }

        if (sessionError) {
          setError(sessionError.message)
        }

        setSession(data.session)
        setAuthLoading(false)
      })
      .catch((sessionError) => {
        if (active) {
          setError(sessionError.message)
          setAuthLoading(false)
        }
      })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase || !sessionUserId) {
      return undefined
    }

    let active = true

    supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', sessionUserId)
      .maybeSingle()
      .then(({ data, error: adminError }) => {
        if (!active) {
          return
        }

        if (adminError) {
          setError(`Admin yetkisi doğrulanamadı: ${adminError.message}`)
          setAdminCheckUserId(sessionUserId)
          setAdminStatus('denied')
        } else if (!data) {
          setError(
            'Bu kullanıcıya admin yetkisi verilmemiş. Kurulum adımlarındaki admin_users kaydını kontrol edin.',
          )
          setAdminCheckUserId(sessionUserId)
          setAdminStatus('denied')
        } else {
          setError('')
          setAdminCheckUserId(sessionUserId)
          setAdminStatus('allowed')
        }
      })
      .catch((adminError) => {
        if (active) {
          setError(`Admin yetkisi doğrulanamadı: ${adminError.message}`)
          setAdminCheckUserId(sessionUserId)
          setAdminStatus('denied')
        }
      })

    return () => {
      active = false
    }
  }, [sessionUserId])

  useEffect(() => {
    if (!supabase || !isAdmin || !sessionUserId) {
      return undefined
    }

    let active = true

    supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!active) {
          return
        }

        if (queryError) {
          setError(`Yazılar yüklenemedi: ${queryError.message}`)
          setArticles([])
        } else {
          setError('')
          const loadedArticles = data.map(mapArticle)
          setArticles(loadedArticles)
          setSelectedKey(
            loadedArticles[0] ? getArticleKey(loadedArticles[0]) : '',
          )
        }
        setArticlesLoadedUserId(sessionUserId)
      })
      .catch((queryError) => {
        if (active) {
          setError(`Yazılar yüklenemedi: ${queryError.message}`)
          setArticlesLoadedUserId(sessionUserId)
        }
      })

    return () => {
      active = false
    }
  }, [adminStatus, isAdmin, sessionUserId])

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!supabase) {
      setError('Supabase yapılandırması bulunamadı.')
      return
    }

    setSaving(true)
    setError('')

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) {
        setError(`Giriş yapılamadı: ${loginError.message}`)
      }
    } catch (loginError) {
      setError(`Giriş yapılamadı: ${getErrorMessage(loginError)}`)
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    if (!supabase) {
      return
    }

    try {
      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) {
        setError(`Çıkış yapılamadı: ${signOutError.message}`)
      }
    } catch (signOutError) {
      setError(`Çıkış yapılamadı: ${getErrorMessage(signOutError)}`)
    }
  }

  const updateSelectedArticle = (field, value) => {
    setArticles((current) =>
      current.map((article) =>
        getArticleKey(article) === selectedKey
          ? { ...article, [field]: value }
          : article,
      ),
    )
    setError('')
    setNotice('')
  }

  const handleAddArticle = () => {
    const newArticle = {
      dbId: null,
      localId: crypto.randomUUID(),
      id: makeNewSlug(articles),
      category: '',
      title: '',
      image: '',
      imageAlt: '',
      readingTime: '',
      excerpt: '',
      paragraphs: [''],
      published: false,
    }

    setArticles((current) => [...current, newArticle])
    setSelectedKey(newArticle.localId)
    setError('')
    setNotice('')
  }

  const handleSaveArticle = async () => {
    if (!supabase || !selectedArticle) {
      return
    }

    const slug = selectedArticle.id.trim()
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setError('URL kısa adı yalnızca küçük harf, rakam ve tire içermeli.')
      return
    }
    if (
      !selectedArticle.title.trim() ||
      !selectedArticle.category.trim() ||
      !selectedArticle.excerpt.trim() ||
      !selectedArticle.paragraphs.some((paragraph) => paragraph.trim())
    ) {
      setError('Başlık, kategori, kısa açıklama ve yazı içeriği zorunludur.')
      return
    }

    const articleData = {
      slug,
      category: selectedArticle.category.trim(),
      title: selectedArticle.title.trim(),
      image_url: selectedArticle.image.trim(),
      image_alt: selectedArticle.imageAlt.trim(),
      reading_time: selectedArticle.readingTime.trim(),
      excerpt: selectedArticle.excerpt.trim(),
      paragraphs: selectedArticle.paragraphs,
      published: selectedArticle.published,
      updated_at: new Date().toISOString(),
    }

    setSaving(true)
    setError('')
    setNotice('')

    try {
      const result = selectedArticle.dbId
        ? await supabase
            .from('articles')
            .update(articleData)
            .eq('id', selectedArticle.dbId)
            .select()
            .single()
        : await supabase.from('articles').insert(articleData).select().single()

      if (result.error) {
        setError(`Yazı kaydedilemedi: ${result.error.message}`)
      } else {
        const savedArticle = {
          ...mapArticle(result.data),
          localId: selectedArticle.localId,
        }
        const previousKey = getArticleKey(selectedArticle)
        setArticles((current) =>
          current.map((article) =>
            getArticleKey(article) === previousKey ? savedArticle : article,
          ),
        )
        setSelectedKey(savedArticle.dbId)
        setNotice('Yazı Supabase’e kaydedildi.')
      }
    } catch (saveError) {
      setError(`Yazı kaydedilemedi: ${getErrorMessage(saveError)}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteArticle = async () => {
    if (!supabase || !selectedArticle) {
      return
    }

    if (!window.confirm(`“${selectedArticle.title || 'Başlıksız yazı'}” silinsin mi?`)) {
      return
    }

    setSaving(true)
    setError('')
    setNotice('')

    try {
      if (selectedArticle.dbId) {
        const { error: deleteError } = await supabase
          .from('articles')
          .delete()
          .eq('id', selectedArticle.dbId)

        if (deleteError) {
          setError(`Yazı silinemedi: ${deleteError.message}`)
          return
        }
      }

      const remainingArticles = articles.filter(
        (article) => getArticleKey(article) !== selectedKey,
      )
      setArticles(remainingArticles)
      setSelectedKey(
        remainingArticles[0] ? getArticleKey(remainingArticles[0]) : '',
      )
      setNotice('Yazı silindi.')
    } catch (deleteError) {
      setError(`Yazı silinemedi: ${getErrorMessage(deleteError)}`)
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (event) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    input.value = ''

    if (!file || !supabase || !selectedArticle) {
      return
    }

    if (!imageTypes.includes(file.type)) {
      setError('Yalnızca JPEG, PNG, WebP veya AVIF görseller yüklenebilir.')
      return
    }

    if (file.size > maxImageSize) {
      setError('Görsel boyutu 5 MB’tan küçük olmalı.')
      return
    }

    const safeFileName = file.name
      .normalize('NFKD')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
    const storagePath = `${crypto.randomUUID()}-${safeFileName}`

    setUploading(true)
    setError('')
    setNotice('')

    try {
      const { data, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(storagePath, file, {
          cacheControl: '3600',
          contentType: file.type,
          upsert: false,
        })

      if (uploadError) {
        setError(`Görsel yüklenemedi: ${uploadError.message}`)
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('blog-images')
          .getPublicUrl(data.path)
        updateSelectedArticle('image', publicUrlData.publicUrl)
        setNotice('Görsel yüklendi. Yazı değişikliklerini kaydetmeyi unutma.')
      }
    } catch (uploadError) {
      setError(`Görsel yüklenemedi: ${getErrorMessage(uploadError)}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <SiteLayout>
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              color: colors.muted,
              fontSize: 9,
              letterSpacing: '1.7px',
              textTransform: 'uppercase',
            }}
          >
            İçerik yönetimi
          </Typography>
          <Typography
            component="h1"
            sx={{
              mt: 1,
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: { xs: 40, md: 52 },
              fontWeight: 400,
            }}
          >
            Blog yazıları
          </Typography>

          {!supabase && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Supabase bağlantı ayarları bulunamadı. `.env.local` dosyasını
              kontrol edin.
            </Alert>
          )}

          {authLoading && (
            <Typography sx={{ mt: 3, color: colors.muted }}>
              Oturum kontrol ediliyor...
            </Typography>
          )}

          {!authLoading && supabase && !session && (
            <Paper
              component="form"
              onSubmit={handleLogin}
              elevation={0}
              sx={{
                display: 'grid',
                gap: 2,
                maxWidth: 440,
                mt: 3,
                p: { xs: 2.5, md: 3 },
                border: `1px solid ${colors.line}`,
                bgcolor: colors.sageLight,
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 30,
                }}
              >
                Admin girişi
              </Typography>
              <TextField
                label="E-posta"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Şifre"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                fullWidth
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                sx={{
                  py: 1.25,
                  bgcolor: colors.green,
                  borderRadius: 0,
                  color: colors.cream,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#145246' },
                }}
              >
                Giriş yap
              </Button>
            </Paper>
          )}

          {session && adminCheckPending && (
            <Typography sx={{ mt: 3, color: colors.muted }}>
              Admin yetkisi kontrol ediliyor...
            </Typography>
          )}

          {session && !adminCheckPending && adminStatus === 'denied' && (
            <Stack spacing={2} sx={{ maxWidth: 620, mt: 3 }}>
              <Alert severity="error">{error}</Alert>
              <Button
                onClick={handleSignOut}
                sx={{ alignSelf: 'flex-start', color: colors.green }}
              >
                Çıkış yap
              </Button>
            </Stack>
          )}

          {isAdmin && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '280px minmax(0, 1fr)' },
                gap: { xs: 3, md: 4 },
                mt: 3,
              }}
            >
              <Stack spacing={1.5}>
                <Button
                  onClick={handleAddArticle}
                  variant="outlined"
                  sx={{
                    py: 1.2,
                    borderColor: colors.green,
                    borderRadius: 0,
                    color: colors.green,
                    textTransform: 'none',
                  }}
                >
                  + Yeni yazı ekle
                </Button>
                <Stack spacing={1}>
                  {articles.map((article) => {
                    const articleKey = getArticleKey(article)
                    return (
                      <Button
                        key={articleKey}
                        onClick={() => {
                          setSelectedKey(articleKey)
                          setError('')
                          setNotice('')
                        }}
                        variant={
                          selectedKey === articleKey ? 'contained' : 'text'
                        }
                        disableElevation
                        sx={{
                          justifyContent: 'flex-start',
                          px: 1.5,
                          py: 1.25,
                          borderRadius: 0,
                          bgcolor:
                            selectedKey === articleKey
                              ? colors.green
                              : 'transparent',
                          color:
                            selectedKey === articleKey
                              ? colors.cream
                              : colors.green,
                          textAlign: 'left',
                          textTransform: 'none',
                          '&:hover': {
                            bgcolor:
                              selectedKey === articleKey
                                ? '#145246'
                                : colors.sageLight,
                          },
                        }}
                      >
                        {article.title || 'Başlıksız yazı'}
                        {!article.published && ' · Taslak'}
                      </Button>
                    )
                  })}
                </Stack>
                <Button
                  onClick={handleSignOut}
                  sx={{
                    alignSelf: 'flex-start',
                    color: colors.muted,
                    textTransform: 'none',
                  }}
                >
                  Çıkış yap
                </Button>
              </Stack>

              {articlesLoading ? (
                <Typography sx={{ color: colors.muted }}>
                  Yazılar yükleniyor...
                </Typography>
              ) : selectedArticle ? (
                <Stack spacing={2}>
                  {error && <Alert severity="error">{error}</Alert>}
                  {notice && <Alert severity="success">{notice}</Alert>}
                  <TextField
                    label="Başlık"
                    value={selectedArticle.title}
                    onChange={(event) =>
                      updateSelectedArticle('title', event.target.value)
                    }
                    required
                    fullWidth
                  />
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      label="URL kısa adı"
                      value={selectedArticle.id}
                      onChange={(event) =>
                        updateSelectedArticle('id', event.target.value)
                      }
                      required
                      fullWidth
                      helperText={`Yazı adresi: /yazilar/${selectedArticle.id}`}
                    />
                    <TextField
                      label="Kategori"
                      value={selectedArticle.category}
                      onChange={(event) =>
                        updateSelectedArticle('category', event.target.value)
                      }
                      required
                      fullWidth
                    />
                  </Stack>
                  <TextField
                    label="Kısa açıklama"
                    value={selectedArticle.excerpt}
                    onChange={(event) =>
                      updateSelectedArticle('excerpt', event.target.value)
                    }
                    multiline
                    minRows={2}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Yazı içeriği"
                    value={selectedArticle.paragraphs.join('\n\n')}
                    onChange={(event) =>
                      updateSelectedArticle(
                        'paragraphs',
                        event.target.value
                          .split(/\n\s*\n/)
                          .map((paragraph) => paragraph.trim()),
                      )
                    }
                    multiline
                    minRows={8}
                    required
                    fullWidth
                    helperText="Paragrafları birbirinden boş satırla ayır."
                  />
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      label="Okuma süresi"
                      value={selectedArticle.readingTime}
                      onChange={(event) =>
                        updateSelectedArticle(
                          'readingTime',
                          event.target.value,
                        )
                      }
                      fullWidth
                    />
                    <TextField
                      label="Görsel açıklaması"
                      value={selectedArticle.imageAlt}
                      onChange={(event) =>
                        updateSelectedArticle('imageAlt', event.target.value)
                      }
                      fullWidth
                    />
                  </Stack>
                  <TextField
                    label="Görsel adresi"
                    value={selectedArticle.image}
                    onChange={(event) =>
                      updateSelectedArticle('image', event.target.value)
                    }
                    fullWidth
                  />
                  <Button
                    component="label"
                    variant="outlined"
                    disabled={uploading}
                    sx={{
                      alignSelf: 'flex-start',
                      borderColor: colors.green,
                      borderRadius: 0,
                      color: colors.green,
                      textTransform: 'none',
                    }}
                  >
                    {uploading ? 'Görsel yükleniyor...' : 'Bilgisayardan görsel yükle'}
                    <Box
                      component="input"
                      type="file"
                      hidden
                      accept={imageTypes.join(',')}
                      onChange={handleImageUpload}
                    />
                  </Button>
                  {selectedArticle.image && (
                    <Box
                      component="img"
                      src={selectedArticle.image}
                      alt={selectedArticle.imageAlt}
                      sx={{
                        width: '100%',
                        maxHeight: 320,
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={selectedArticle.published}
                        onChange={(event) =>
                          updateSelectedArticle(
                            'published',
                            event.target.checked,
                          )
                        }
                      />
                    }
                    label="Yayımla"
                  />
                  <Stack
                    direction={{ xs: 'column-reverse', sm: 'row' }}
                    spacing={1.5}
                    sx={{ justifyContent: 'space-between', pt: 1 }}
                  >
                    <Button
                      onClick={handleDeleteArticle}
                      disabled={saving}
                      sx={{
                        alignSelf: { xs: 'flex-start', sm: 'center' },
                        color: '#9b3b32',
                        textTransform: 'none',
                      }}
                    >
                      Yazıyı sil
                    </Button>
                    <Button
                      onClick={handleSaveArticle}
                      variant="contained"
                      disabled={saving || uploading}
                      sx={{
                        px: 2.5,
                        py: 1.25,
                        bgcolor: colors.green,
                        borderRadius: 0,
                        color: colors.cream,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#145246' },
                      }}
                    >
                      {saving ? 'Kaydediliyor...' : 'Yazıyı kaydet'}
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <Alert severity="info">
                  Henüz yazı yok. “Yeni yazı ekle” ile başlayabilirsin.
                </Alert>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </SiteLayout>
  )
}

export default AdminPage
