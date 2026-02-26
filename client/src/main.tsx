import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/auth-context'
import { ToastProvider } from './contexts/toast-context'
import Login from './pages/login/login'
import Register from './pages/register/register'
import HomePage from './pages/home/home'
import LessonDetailPage from './pages/lesson-detail/lesson-detail'
import ProtectRoute from './components/protect-route/protect-route'
import LessonPage from './pages/lesson/lesson'
import MainLayout from './layout/main-layout'
import { MessageProvider } from './contexts/message-context'
import { ConfirmProvider } from './contexts/confirm-context'
import ProfilePage from './pages/profile/profile'
import ChangePasswordPage from './pages/change-password/change-password'
import ExamPage from './pages/exam/exam'
import NotFoundPage from './pages/not-found/not-found'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ConfirmProvider>
      <MessageProvider>
        <ToastProvider>
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
        </ToastProvider>
      </MessageProvider>
    </ConfirmProvider>
  </AuthProvider>
)
