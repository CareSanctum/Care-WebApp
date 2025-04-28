import React, { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Payments from './pages/Payments';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import Onboarding from './pages/Onboarding';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import AdminLogin from './pages/AdminLogin';
import { setCredentials } from './store/slices/authSlice';
import Terms  from './pages/Terms';
import Privacy from './pages/Privacy';
import B2BDashboard from "./pages/b2b/B2BDashboard";
import B2BSignIn from "./pages/b2b/B2BSignIn";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

const AppRoutes = () => {
  const dispatch = useAppDispatch();

  // Immediately sync isAuthenticated from localStorage on load
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedUsername) {
      dispatch(setCredentials({ accessToken: storedToken, username: storedUsername }));
    }

    // After setting credentials, stop loading
    setLoading(false);
  }, [dispatch]);

  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? element : <Navigate to="/signin" replace />;
  };

  const PublicRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? <Navigate to="/home" replace /> : element;
  };

  if (loading) {
    return null; // or show a spinner if you want
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/signin"} replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      
      <Route path="/onboarding" element={<PrivateRoute element={<Onboarding />} />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/payments" element={<PrivateRoute element={<Payments />} />} />

      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />

      <Route path="/b2b/signin" element={<B2BSignIn />} />
      <Route path="/b2b/dashboard" element={<B2BDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
