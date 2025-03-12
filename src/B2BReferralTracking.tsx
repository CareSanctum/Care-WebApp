import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardFooter, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Users, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from '@/store/hooks';
import useB2BReferral from '@/hooks/use-b2brefcode';
import useReferralsData from '@/hooks/use-refdata';
import useReferralStatsB2B from '@/hooks/use-referralstatsB2B';

export const B2BReferralTracking = () => {
  const { toast } = useToast();
  const { username } = useAppSelector((state) => state.auth);

  // Get referral details
  const referralLink = useB2BReferral()?.link;
  const referralcode = useB2BReferral()?.code;
  const referredUsers = useReferralsData(referralcode);
  const statsData = useReferralStatsB2B(referralcode);

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast({
        title: "Referral link copied!",
        description: "Share it with your network.",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="w-full shadow-lg" id="referrals">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Referral Dashboard
        </CardTitle>
        <CardDescription>Track your referrals, rewards, and performance</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Referral History */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Referred Users</h3>
          <div className="overflow-y-auto max-h-[300px] p-3 border rounded-lg bg-gray-50">
            {referredUsers.length > 0 ? (
              referredUsers.map((user, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm mb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                      {user.username.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium">{user.username}</h4>
                      <p className="text-xs text-gray-500">Referred on {new Date(user.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    {user.status === 'PAID' ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Earned ₹{user.reward}
                      </span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No referrals yet.</p>
            )}
          </div>
        </div>
      </CardContent>

      {/* Stats Section */}
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
          <Award className="w-4 h-4" />
          Users Referred: {statsData?.total_leads_count || 0}
        </div>
        <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
          <Award className="w-4 h-4" />
          Total Earnings: ₹{statsData?.total_commission || 0}
        </div>
      </CardFooter>
    </Card>
  );
};
