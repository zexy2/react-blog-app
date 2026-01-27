/**
 * App Component
 * Main application component with routing
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from './store/slices/uiSlice';
import { setUser, setSession, setLoading } from './store/slices/userSlice';
import { supabaseAuth } from './lib/supabase';

// Layout
import Header from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import CustomCursor from './components/CustomCursor';

// Pages
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import UserPage from './pages/UserPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CreatePostPage from './pages/CreatePostPage';
import BookmarksPage from './pages/BookmarksPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// SSR-compatible useLayoutEffect
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function App() {
  const location = useLocation();
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  // Initialize auth state on app load
  useEffect(() => {
    const initAuth = async () => {
      dispatch(setLoading(true));
      try {
        const { data: { session } } = await supabaseAuth.getSession();
        if (session) {
          dispatch(setSession(session));
          dispatch(setUser(session.user));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabaseAuth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          dispatch(setSession(session));
          dispatch(setUser(session.user));
        } else {
          dispatch(setSession(null));
          dispatch(setUser(null));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [dispatch]);

  // Scroll to top on route change
  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ErrorBoundary>
      <CustomCursor />
      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Header />
        <main
          style={{
            position: 'relative',
            width: '100%',
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route
              path="/posts/create"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route
              path="/posts/:id/edit"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
            <Route path="/users/:id" element={<UserPage />} />
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <BookmarksPage />
                </ProtectedRoute>
              }
            />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
