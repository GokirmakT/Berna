import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  AdminPage,
  ArticlePage,
  ArticlesPage,
  HomePage,
  NotFoundPage,
} from './RoutePages.jsx'
import ScrollManager from './ScrollManager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <ScrollManager />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/yazilar" element={<ArticlesPage />} />
          <Route path="/yazilar/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
