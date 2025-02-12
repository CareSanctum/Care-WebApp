import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PersonalInfoCard } from '@/components/profile/PersonalInfoCard';
import { ContactCard } from '@/components/profile/ContactCard';
import { EmergencyContactCard } from '@/components/profile/EmergencyContactCard';
import { MedicalInfoCard } from '@/components/profile/MedicalInfoCard';
import { LifestyleCard } from '@/components/profile/LifestyleCard';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();


  const handleSignOut = () => {
    // Clear session and local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("username");
  
    // Clear all cookies
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
  
    // Show toast message
    toast({
      title: "Signed out successfully",
      duration: 2000,
    });
  
    // Redirect to sign-in page
    navigate('/signin');
  };
  

  const profileData = {
    personalInfo: {
      fullName: "Pawan Agarwal",
      dob: "1958-05-15",
      gender: "Male",
      bloodGroup: "O+",
      height: "175",
      weight: "68",
      wakeUpTime: "6:00 AM",
      currentLocation: {
        status: "home" as const,
        expectedReturn: undefined
      }
    },
    contact: {
      phone: "+91 98765 43210",
      altPhone: "+91 98765 43211",
      email: "pawan.agarwal@truemail.com",
      address: "42/B, Pali Hill Road, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050"
    },
    emergencyContact: {
      name: "Roshan Agarwal",
      phone: "+91 98765 43212",
      relationship: "Son",
      neighborName: "Rajesh Kumar",
      neighborPhone: "+91 98765 43213"
    },
    medicalInfo: {
      healthConditions: "Hypertension, Diabetes Type 2",
      allergies: "Peanuts, Penicillin",
      surgeries: "Knee replacement (2019)",
      doctorName: "Dr. Mehta",
      doctorContact: "+91 98765 43214",
      preferredHospital: "Lilavati Hospital"
    },
    lifestyle: {
      activityLevel: "Moderately Active",
      dietPreference: "Vegetarian",
      specialNeeds: {
        mobilityAssistance: true,
        visionImpairment: false,
        hearingImpairment: false
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/home')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
          <Button 
            onClick={() => navigate('/onboarding')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            Edit Profile
          </Button>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <PersonalInfoCard personalInfo={profileData.personalInfo} />
        <ContactCard contact={profileData.contact} />
        <EmergencyContactCard emergencyContact={profileData.emergencyContact} />
        <MedicalInfoCard medicalInfo={profileData.medicalInfo} />
        <LifestyleCard lifestyle={profileData.lifestyle} />
        
        <Button 
          variant="destructive" 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </main>
    </div>
  );
};

export default Profile;