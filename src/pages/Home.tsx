import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HomeHeader } from '@/components/HomeHeader';
import { HealthStatusCard } from '@/components/HealthStatusCard';
import { PrimaryVitals } from '@/components/PrimaryVitals';
import { AdditionalHealthMetrics } from '@/components/AdditionalHealthMetrics';
import { PrescriptionManagement } from '@/components/PrescriptionManagement';
import { TicketHistory } from "@/components/TicketHistory";
import { ConciergeService } from "@/components/ConciergeService";
import { BuddyScheduler } from "@/components/BuddyScheduler";
import { CommunityEvents } from "@/components/CommunityEvents";
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { gethealthdataRequest } from '@/requests/gethealthdataRequest';
import { getCMdetailsRequest } from '@/requests/getCMdetailsRequest';
import { contactCMRequest } from '@/requests/contactCMReques';
import { toast } from '@/hooks/use-toast';

//utility function to convert date
const formatCheckedAt = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();

  // Remove time from the date comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Format time in 12-hour format
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (date.toDateString() === today.toDateString()) {
    return `Today, ${formattedTime}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${formattedTime}`;
  } else {
    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${formattedTime}`;
  }
};

const Home = () => {
  const navigate = useNavigate();
    const {username} = useAppSelector((state) => state.auth);
    const [userDetails, setUserDetails] = useState<any>(null)
    const [loading, setLoading] = useState(false);;
    const [CMDetails, setCMdetails] = useState<any>(null);
      useEffect(() => {
      const fetchUserDetails = async () => {
          try {
            const data = await gethealthdataRequest(username);  // Call the function
            const CMdata = await getCMdetailsRequest(username);
            console.log(data);
            setUserDetails(data);
            setCMdetails(CMdata);

            console.log(userDetails) // Store response in the stat
          } catch (error: any) {
            console.log(error);
          }
        };
    
        fetchUserDetails();  // Run the function on mount
      }, []);

      const handleContact = async () => {
        setLoading(true);
        const message = await contactCMRequest(username);
        toast({
          title: "Mail sent to Care Manager",
          description: `${message}`,
        });
        setLoading(false);
      }

      const status_message: string = userDetails?.health_status_overview?.status_message || "";
      const next_checkup_date: string = userDetails?.health_status_overview?.next_checkup_date || "";

      const HeartRate: number = userDetails?.vital_signs?.heart_rate || 0;
      const BloodPressure: string = userDetails?.vital_signs?.blood_pressure || "";
      const RespiratoryRate: number = userDetails?.vital_signs?.respiratory_rate || 0;
      const Temperature: number =  userDetails?.vital_signs?.temperature || 0;
      const vitals_checked_at: string = userDetails?.vital_signs?.checked_at || "";

      const BloodSugar: number =  userDetails?.health_metrics?.blood_sugar || 0;
      const Ecg: string =  userDetails?.health_metrics?.ecg || "";
      const Bmi: number =  userDetails?.health_metrics?.bmi || 0;
      const SleepLevel: number =  userDetails?.health_metrics?.sleep_level || 0;
      const StressLevel: string =  userDetails?.health_metrics?.stress_level || "";
      const BloodOxygen: number =  userDetails?.health_metrics?.blood_oxygen || 0;
      const health_checked_at: string =  userDetails?.health_metrics?.checked_at || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <HomeHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <HealthStatusCard status_message={status_message} next_checkup_date={next_checkup_date} />
        <PrimaryVitals HeartRate={HeartRate} BloodPressure={BloodPressure} RespiratoryRate={RespiratoryRate} Temperature={Temperature} 
        checked_at={formatCheckedAt(vitals_checked_at)} />
        <AdditionalHealthMetrics 
          BloodOxygen={BloodOxygen} 
          Ecg={Ecg} Bmi={Bmi} 
          SleepLevel={SleepLevel} 
          StressLevel={StressLevel} 
          BloodSugar={BloodSugar} checked_at={formatCheckedAt(health_checked_at)}  />

        <div className="grid gap-6 md:grid-cols-2">
          <TicketHistory />
          <ConciergeService />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <BuddyScheduler />
          <CommunityEvents />
        </div>

        <PrescriptionManagement />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-white to-gray-50 border-primary/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary">Payment & Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Current Plan: Premium Care (₹14,999/month)</p>
              <Button onClick={() => navigate('/payments')} className="bg-primary hover:bg-primary/90">
                Manage Subscription
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-gray-50 border-primary/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary">Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <p className="text-gray-700">{CMDetails?.care_manager?.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <p className="text-gray-700">{CMDetails?.care_manager?.phone_number}</p>
              </div>
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                onClick={handleContact}
                disabled={!CMDetails?.care_manager?.email || !CMDetails?.care_manager?.phone_number}>
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  'Contact Care Manager'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;