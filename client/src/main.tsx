import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import ProtectRoute from './components/protect-route/protect-route'

import LoginPage from './pages/login/login'
import RegisterPage from './pages/register/register'
import HomePage from './pages/home/home'
import LessonDetailPage from './pages/lesson-detail/lesson-detail'
import LessonPage from './pages/lesson/lesson'
import ProfilePage from './pages/profile/profile'
import ChangePasswordPage from './pages/change-password/change-password'
import ExamPage from './pages/exam/exam'
import NotFoundPage from './pages/not-found/not-found'

import MainLayout from './layout/main-layout'

import { ProductionProvider } from './contexts/production/production-context'

createRoot(document.getElementById('root')!).render(
  <ProductionProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={
          <ProtectRoute redirectIfAuthenticated="/">
            <LoginPage />
          </ProtectRoute>

        } />

        <Route path="/auth/register" element={
          <ProtectRoute redirectIfAuthenticated="/">
            <RegisterPage />
          </ProtectRoute>
        } />

        <Route path='/' element={<MainLayout />}>
          <Route path="/" element={
            <ProtectRoute requireAuth={{ isRequired: true, redirectTo: "/auth/login" }}>
              <HomePage />
            </ProtectRoute>
          } />

          <Route path="/page/lesson" element={
            <ProtectRoute requireAuth={{ isRequired: true, redirectTo: "/auth/login" }}>
              <LessonPage />
            </ProtectRoute>
          } />

          <Route path="/page/lesson/:id" element={
            <ProtectRoute requireAuth={{ isRequired: true, redirectTo: "/auth/login" }}>
              <LessonDetailPage />
            </ProtectRoute>
          } />

          <Route path="/page/profile" element={
            <ProtectRoute requireAuth={{ isRequired: true, redirectTo: "/auth/login" }}>
              <ProfilePage />
            </ProtectRoute>
          } />

          <Route path="/page/change-password" element={
            <ProtectRoute requireAuth={{ isRequired: true, redirectTo: "/auth/login" }}>
              <ChangePasswordPage />
            </ProtectRoute>
          } />

          <Route path="/page/exam" element={
            <ProtectRoute requireAuth={{ isRequired: true, redirectTo: "/auth/login" }}>
              <ExamPage />
            </ProtectRoute>
          } />

        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </ProductionProvider>
)
