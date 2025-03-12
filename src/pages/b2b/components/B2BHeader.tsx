import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Link, Copy, Users, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Logo } from '@/components/Logo';
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from '@/store/hooks';
import { viewRequest } from '@/requests/viewRequest';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useB2BReferral from '@/hooks/use-b2brefcode';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

export const B2BHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const referralLink = useB2BReferral()?.link;
  const companyName = useB2BReferral()?.company_name;
  const imageLink = useB2BReferral()?.image_link
  
  const { username } = useAppSelector((state) => state.auth);
  const [profileUrl, setProfileUrl] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await viewRequest(username);
        setProfileUrl(data?.patient?.profile_picture_url || "");
        setCompanyLogo(data?.company?.logo || "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfileData();
  }, [username]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast({
        title: "Referral link copied!",
        description: "Share it with your friends and family",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSignOut = () => {
    dispatch(logout());
    
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
    
    navigate('/b2b/signin');
    
    toast({
      title: "Signed out successfully",
      duration: 2000,
    });
  };

  return (
    <header className="bg-white shadow-lg border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* CareSanctum Logo */}
          <img 
            src={imageLink} 
            alt={companyName}
            className="h-24 object-contain" 
          />
          <span className="text-gray-400 text-xl">×</span>
          <Logo/>
        </div>

        {/* Right Section: Referral, Notifications & Logout */}
        <div className="flex items-center gap-3">
          {/* Referral Button - Increased Size */}
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="lg" 
                className="relative bg-gradient-to-r from-primary/10 to-secondary/10 px-5 py-2"
              >
                <Users className="h-6 w-6 text-primary" />
                <span className="ml-2 text-sm font-medium">Refer & Earn</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
                <Users className="h-5 w-5" /> Share with friends & family
              </DialogTitle>
              <div className="mt-4">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <Link className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-primary">Your Referral Link</h3>
                  </div>
                  <div className="grid grid-cols-[1fr,auto] gap-2 items-center w-full">
                    <Input value={referralLink} readOnly className="bg-white border-primary/20" />
                    <Button onClick={handleCopyLink} size="sm" className="flex items-center gap-1">
                      <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Sign Out Button - Reduced Size */}
          <Button 
            variant="destructive" 
            size="sm"
            className="flex items-center gap-2 px-3 py-1.5"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
