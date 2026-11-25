import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'

export function mapArticle(row) {
  return {
    dbId: row.id,
    id: row.slug,
    category: row.category,
    title: row.title,
    image: row.image_url,
    imageAlt: row.image_alt,
    readingTime: row.reading_time,
    excerpt: row.excerpt,
    paragraphs: row.paragraphs,
    published: row.published,
  }
}

function getErrorMessage(error, fallback) {
  return typeof error?.message === 'string' ? error.message : fallback
}

export function useArticles({ publishedOnly = true } = {}) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadArticles() {
      if (!supabase) {
        setError('Supabase yapılandırması bulunamadı. .env.local dosyasını kontrol edin.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        let query = supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false })

        if (publishedOnly) {
          query = query.eq('published', true)
        }

        const { data, error: queryError } = await query

        if (queryError) {
          throw queryError
        }

        if (active) {
          setArticles(data.map(mapArticle))
        }
      } catch (requestError) {
        if (active) {
          setError(
            getErrorMessage(
              requestError,
              'Yazılar yüklenirken beklenmeyen bir hata oluştu.',
            ),
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadArticles()

    return () => {
      active = false
    }
  }, [publishedOnly])

  return { articles, loading, error }
}

export function useArticle(slug) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadArticle() {
      if (!supabase) {
        setError('Supabase yapılandırması bulunamadı. .env.local dosyasını kontrol edin.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')
      setArticle(null)

      try {
        const { data, error: queryError } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle()

        if (queryError) {
          throw queryError
        }

        if (active && data) {
          setArticle(mapArticle(data))
        }
      } catch (requestError) {
        if (active) {
          setError(
            getErrorMessage(
              requestError,
              'Yazı yüklenirken beklenmeyen bir hata oluştu.',
            ),
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadArticle()

    return () => {
      active = false
    }
  }, [slug])

  return { article, loading, error }
}
