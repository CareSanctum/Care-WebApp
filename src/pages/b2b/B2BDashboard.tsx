
import React, { useState } from 'react';
import { B2BHeader } from './components/B2BHeader';
import { EarningsCelebration } from './components/EarningsCelebration';
import { ReferralTable } from './components/ReferralTable';
import { ReferralUser, Notification } from './types';
import useReferral from '@/hooks/use-refcode';
import useReferralStatsB2B from '@/hooks/use-referralstatsB2B';
import useReferralsData from '@/hooks/use-refdata';
import { B2BReferralTracking } from '@/B2BReferralTracking';

// Mock data for testing
const mockReferralUsers: ReferralUser[] = [
  {
    id: '1',
    name: 'Pawan Agarwal',
    onboardingStatus: 'completed',
    joinedAt: '2023-11-15T10:30:00Z',
    earnings: 3000,
    feedback: {
      rating: 5,
      review: "The onboarding process was smooth and the service is excellent. Highly recommend!"
    }
  },
  {
    id: '2',
    name: 'Arvind Kumar',
    onboardingStatus: 'failed',
    joinedAt: '2023-12-05T14:20:00Z',
    earnings: 0,
    feedback: null
  },
  {
    id: '3',
    name: 'Sangeeta Mehta',
    onboardingStatus: 'completed',
    joinedAt: '2023-10-22T08:15:00Z',
    earnings: 3000,
    feedback: {
      rating: 4,
      review: "Good service, though could improve on response time."
    }
  },
  {
    id: '4',
    name: 'Rahul Sharma',
    onboardingStatus: 'pending',
    joinedAt: '2024-01-10T16:45:00Z',
    earnings: 0,
    feedback: null
  },
  {
    id: '5',
    name: 'Priya Patel',
    onboardingStatus: 'completed',
    joinedAt: '2023-09-30T11:20:00Z',
    earnings: 3000,
    feedback: {
      rating: 5,
      review: "Excellent service and very helpful staff."
    }
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Pawan Agarwal',
    type: 'success',
    message: 'Pawan Agarwal successfully onboarded with your referral. You earned 3000',
    earnings: 3000,
    date: '2023-11-15T10:35:00Z',
    read: false
  },
  {
    id: '2',
    userId: '2',
    userName: 'Arvind Kumar',
    type: 'failure',
    message: 'abc',
    date: '2023-12-05T14:30:00Z',
    read: true
  },
  {
    id: '3',
    userId: '3',
    userName: 'Sangeeta Mehta',
    type: 'success',
    message: 'Sangeeta Mehta successfully onboarded with your referral. You earned 2000!',
    earnings: 3000,
    date: '2023-10-22T08:30:00Z',
    read: true
  },
  {
    id: '4',
    userId: '5',
    userName: 'Priya Patel',
    type: 'success',
    message: 'Priya Patel successfully onboarded with your referral. You earned ₹3000!',
    earnings: 3000,
    date: '2023-09-30T11:40:00Z',
    read: true
  }
];

const B2BDashboard = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const referralLink = useReferral()?.link;
  const referralcode = useReferral()?.code;

  const referredUsers =useReferralsData(referralcode);
 

  const statsData = useReferralStatsB2B(referralcode);


  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <B2BHeader 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Partner Dashboard</h1>
        <div className="mb-8">
          <EarningsCelebration 
            totalEarnings={statsData?.total_commission?statsData?.total_commission:0} 
            referralCount={statsData?.total_leads_count?statsData?.total_leads_count:0}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Referrals</h2>
          <div className="my-8">
                    <B2BReferralTracking />
                  </div>
        </div>
      </main>
    </div>
  );
};

export default B2BDashboard;
