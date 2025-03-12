import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from '@/components/Logo';
import { toast } from "@/components/ui/use-toast";
import { setCredentials } from '@/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const B2BSignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      navigate('/b2b/dashboard');
    }

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };

    return () => {
      window.onpopstate = null;
    };
  }, [navigate, accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access;
        const username = data.user_name;
        dispatch(setCredentials({ accessToken, username }));

        toast({ title: "Login Successful", description: "Redirecting...", variant: "success" });
        navigate("/b2b/dashboard");
      } else {
        const errorData = await response.json();
        toast({ title: "Login Failed", description: errorData.message || "Invalid credentials", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-violet-100/30">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <Logo />
          <CardTitle className="text-2xl mt-4">Partner Sign In</CardTitle>
          <p className="text-sm text-muted-foreground">Manage your referrals and earnings</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Business Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <a href="/signin" className="text-sm text-primary hover:underline">
              Back to regular sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default B2BSignIn;