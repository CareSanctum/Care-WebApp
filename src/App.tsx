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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

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
      </QueryClientProvider>
    </Provider>
  );
};

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true); // Loading state to control route rendering

  // Ensure access token from localStorage is set on app load if present
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedUsername) {
      dispatch(setCredentials({ accessToken: storedToken, username: storedUsername }));
    }

    // Set loading to false after checking localStorage
    setLoading(false);
  }, [dispatch]);

  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return accessToken ? element : <Navigate to="/signin" replace />;
  };

  if (loading) {
    // Optionally, return a loading spinner or nothing while checking localStorage
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={accessToken ? "/home" : "/signin"} replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      
      <Route path="/onboarding" element={<PrivateRoute element={<Onboarding />} />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/payments" element={<PrivateRoute element={<Payments />} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
