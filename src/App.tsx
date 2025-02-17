import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Payments from "./pages/Payments";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Onboarding from "./pages/Onboarding";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppSelector } from "./store/hooks";
import AdminLogin from "./pages/AdminLogin";

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
  // Check if user is on the root path
  const isRootPath = window.location.pathname === '/';
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
  const { accessToken } = useAppSelector((state) => state.auth); // Now Redux is available

  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return accessToken ? element : <Navigate to="/signin" replace />;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={window.location.pathname === '/' ? <Navigate to="/signin" replace /> : <SignIn />} 
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/adminlogin" element={<AdminLogin />} />

      {/* Protected Routes */}
      <Route path="/onboarding" element={<PrivateRoute element={<Onboarding />} />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/payments" element={<PrivateRoute element={<Payments />} />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;