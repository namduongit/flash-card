import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/auth-context'
import { ToastProvider } from './contexts/toast-context'
import { ModalProvider } from './contexts/modal-context'
import Login from './pages/login/login'
import Register from './pages/register/register'
import HomePage from './pages/home/home'
import LessonDetailPage from './pages/lesson-detail/lesson-detail'
import ProtectRoute from './components/protect-route/protect-route'
import LessonPage from './pages/lesson/lesson'
import MainLayout from './layout/main-layout'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ToastProvider>
      <ModalProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={
            <ProtectRoute redirectIfAuthenticated="/">
              <Login />
            </ProtectRoute>

          } />

          <Route path="/auth/register" element={
            <ProtectRoute redirectIfAuthenticated="/">
              <Register />
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
          </Route>
        </Routes>
        </BrowserRouter>
      </ModalProvider>
    </ToastProvider>
  </AuthProvider>
)
