import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Logo } from './Logo';
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from '@/store/hooks';
import { viewRequest } from '@/requests/viewRequest';
import { useState, useEffect } from 'react';

export const HomeHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
    const {username, accessToken} = useAppSelector((state) => state.auth);
    const [profile_url, setprofile_url] = useState("");
  
    const fetchprofilePicture = async () => {
      try {
        const data = await viewRequest(username);  // Call the function
        setprofile_url(data?.patient?.profile_picture_url || "");
      } catch (error: any) {
        console.log(error);
      }
    };
      useEffect(() => {
        fetchprofilePicture();  // Run the function on mount
      }, [username]);

  const handleEmergency = () => {
    toast({
      title: "Emergency assistance requested",
      description: "Our team has been notified and will contact you immediately.",
      duration: 5000,
    });
  };

  return (
    <header className="bg-white shadow-lg border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <Button 
            variant="destructive"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
            onClick={handleEmergency}
          >
            <Bell className="h-5 w-5 animate-pulse" />
            SOS
          </Button>
          <div 
            className="cursor-pointer" 
            onClick={() => navigate('/profile')}
          >
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage 
                src={profile_url}
                alt="Profile Picture"
                className="object-cover"
              />
              <AvatarFallback>PA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};