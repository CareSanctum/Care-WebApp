import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from '@/components/Logo';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [emergencyNotifications, setEmergencyNotifications] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!acceptedTerms || !dataSharing || !emergencyNotifications) {
      toast({
        title: "Consent Required",
        description: "Please accept all the required consents to continue",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const response = await fetch('https://care-backend.onrender.com:10000/api/register/', {
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
              <Input
                type="tel"
                placeholder="Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="dataSharing" 
                  checked={dataSharing}
                  onCheckedChange={(checked) => setDataSharing(checked as boolean)}
                />
                <Label htmlFor="dataSharing">I consent to sharing my data with healthcare providers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="emergencyNotifications" 
                  checked={emergencyNotifications}
                  onCheckedChange={(checked) => setEmergencyNotifications(checked as boolean)}
                />
                <Label htmlFor="emergencyNotifications">I consent to receiving emergency notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <Label htmlFor="terms">
                  I agree to the Terms and Conditions
                </Label>
              </div>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
