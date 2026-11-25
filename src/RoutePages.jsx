import { lazy } from 'react'

export const HomePage = lazy(() => import('./App.jsx'))
export const AdminPage = lazy(() => import('./AdminPage.jsx'))
export const ArticlesPage = lazy(() => import('./ArticlesPage.jsx'))
export const ArticlePage = lazy(() =>
  import('./ArticlePage.jsx').then((module) => ({
    default: module.ArticlePage,
  })),
)
export const NotFoundPage = lazy(() =>
  import('./ArticlePage.jsx').then((module) => ({
    default: module.NotFoundPage,
  })),
)
