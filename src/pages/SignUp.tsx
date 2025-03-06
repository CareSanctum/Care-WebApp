import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from '@/components/Logo';
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from '@/store/hooks';
import CountryCodeSelector from '@/components/ui/countryselector';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showconfirmPassword, setshowconfirmPassword] = useState(false);
  const dispatch = useAppDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setshowconfirmPassword(!showconfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          phone_number: phoneNumber,
          password,
          confirm_password: confirmPassword,
          role: "USERS"
        })
      });
  
      const data = await response.json();
      
      if (response.ok) {
        // Store token and username in localStorage/sessionStorage
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user_name", data.user_name);
        // dispatch(setCredentials({ accessToken, username }));
  
        toast({
          title: "Registration Successful",
          description: "You have successfully registered.",
          variant: "success",
        });
  
        navigate('/onboarding');
      } else {
        toast({
          title: "Registration Failed",
          description: data.message || "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <Logo />
          <CardTitle className="text-2xl mt-4">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              {/* <CountryCodeSelector value={countryCode} onChange={setCountryCode} /> */}
              <Input
                type="tel"
                placeholder="Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                validationRules={{pattern: "[0-9]*" }}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
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
                
                validationRules={{ required: true, minLength:6, pattern: "^(?=.*[0-9]).+$"  }}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </span>
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                confirmPassword={password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a href="/signin" className="text-sm text-primary hover:underline">
              Already have an account? Sign in
            </a>
          </div>
          <div className="mt-4 text-center text-sm font-medium text-gray-500">
            By signing up, you agree to our 
            <a href="/Terms" className="text-[#3D007D] hover:underline"> Terms of Service </a>
              and 
             <a href="/Privacy" className="text-[#3D007D] hover:underline"> Privacy Policy</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
