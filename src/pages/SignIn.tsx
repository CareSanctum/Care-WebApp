import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from '@/components/Logo';
import { toast } from "@/components/ui/use-toast";
import { setCredentials } from '@/store/slices/authSlice';
import { useAppDispatch } from '../store/hooks';
import { useAppSelector } from '../store/hooks';

const SignIn = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); // Supports email or phone number
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const {accessToken} = useAppSelector((state) => state.auth); 

  useEffect(() => {
    if (accessToken) {
      navigate('/home'); // Redirect if already logged in
    }
  
    // Prevent back button navigation
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  
    return () => {
      window.onpopstate = null; // Cleanup when component unmounts
    };
  }, [navigate]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const accessToken = data.access;
        const username = data.user_name;
        // Save access_token in localStorage for session persistence
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user_name", data.user_name);
        dispatch(setCredentials({ accessToken, username }));

        toast({ title: "Login Successful", description: "Redirecting...", variant: "success" });

        navigate("/home"); // Redirect to home
      } else {
        const errorData = await response.json();
        toast({ title: "Login Failed", description: errorData.message || "Invalid credentials", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <Logo />
          <CardTitle className="text-2xl mt-4">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Email or Phone Number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a href="/signup" className="text-sm text-primary hover:underline">
              Don't have an account? Sign up
            </a>
          </div>
          <div className="mt-4 text-center">
            <a href="/AdminLogin" className="text-sm text-primary hover:underline">
              Login as an Admin
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
