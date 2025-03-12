
import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardFooter,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Users, Trophy, Award, Medal, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import useReferral from '@/hooks/use-refcode';
import useReferralsData from '@/hooks/use-refdata';
import useReferralRank from '@/hooks/use-rankedreferrals';
import { useAppSelector } from '@/store/hooks';
import useReferralStats from '@/hooks/use-referralstats';

export const ReferralTracking = () => {
  const { toast } = useToast();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const {username} = useAppSelector((state) => state.auth);
  
  // Generate referral code

  const referralLink = useReferral()?.link;
  const referralcode = useReferral()?.code;
  
  const [copied, setCopied] = useState(false);

  // Sample data for referred users
  const referredUsers =useReferralsData(referralcode);
  const rankedData = useReferralRank();
  const statsData = useReferralStats(referralcode);

  // Current user's position in the leaderboard (index of Pawan Agarwal)
   const currentUserPosition = rankedData?.findIndex(entry => entry.username === username);

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

  return (
    <Card className="w-full" id="referrals">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <CardTitle>My Referrals</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bg-amber-100 text-amber-700 hover:bg-amber-200 hover:text-amber-800 rounded-full"
            onClick={() => setShowLeaderboard(true)}
          >
            <Sparkles className="h-5 w-5 animate-pulse" />
          </Button>
        </div>
        <CardDescription>Track your referrals and rewards</CardDescription>
      </CardHeader>
      
      {/* Leaderboard Dialog */}
      <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center flex items-center justify-center gap-2 text-2xl font-bold">
              <Trophy className="h-6 w-6 text-amber-500" />
              Referral Champions
            </DialogTitle>
          </DialogHeader>
          
          <div className="bg-gradient-to-b from-amber-50 to-white p-4 rounded-lg">
            {/* Celebration GIF */}
            <div className="flex justify-center mb-4">
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTJtMW0xZnl4ajR1cGJ3eWcxOXE0YTA0NmpmbmY2anpoOG5ncmg0aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4KhQo2MESJkc6QbS/giphy.gif" 
                alt="Celebration" 
                className="h-32 rounded-lg"
              />
            </div>
            
            {/* Top 3 Leaderboard */}
            {rankedData?.length >= 3 ? (
            <div className="flex justify-center items-end gap-2 mb-6">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="h-12 w-12 border-2 border-gray-300">
                  <AvatarFallback className="bg-gray-200 text-gray-700">
                    {rankedData[1]?.username?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-700 font-bold mt-2">2</div>
                <p className="text-xs mt-1 font-medium">{rankedData[1]?.username || "N/A"}</p>
                <p className="text-xs">₹{rankedData[1]?.total_earnings || "0"}</p>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-amber-500">
                    <AvatarFallback className="bg-amber-100 text-amber-700">
                      {rankedData[0]?.username?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Medal className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full text-white font-bold mt-2">1</div>
                <p className="text-xs mt-1 font-medium">{rankedData[0]?.username || "N/A"}</p>
                <p className="text-xs">₹{rankedData[0]?.total_earnings || "0"}</p>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="h-12 w-12 border-2 border-amber-700">
                  <AvatarFallback className="bg-amber-50 text-amber-800">
                    {rankedData[2]?.username?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center w-8 h-8 bg-amber-700 rounded-full text-white font-bold mt-2">3</div>
                <p className="text-xs mt-1 font-medium">{rankedData[2]?.username || "N/A"}</p>
                <p className="text-xs">₹{rankedData[2]?.total_earnings || "0"}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No leaderboard data available
            </div>
          )}
            
            {/* Your Ranking */}
            
            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
              <h3 className="text-sm font-semibold text-center mb-2">Your Current Ranking</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-7 h-7 bg-primary text-white rounded-full text-sm font-bold">
                    {currentUserPosition + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{rankedData ? (rankedData[currentUserPosition].username) : (<div></div>)}</p>
                  </div>
                </div>
              <div className="text-lg font-bold text-primary">
                {rankedData ? (`₹${rankedData[currentUserPosition].total_earnings}`) : (<div></div>)}
              </div>
              </div>
            </div>
            
            {/* Call To Action */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Refer more friends to climb the leaderboard!</p>
              <Button 
                onClick={handleCopyLink}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Referral Link"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <CardContent>
        <Tabs defaultValue="share">
          <TabsList className="w-full">
            <TabsTrigger value="share" className="flex-1">Share & Earn</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">Referral History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="share" className="space-y-4">
            <div className="mt-4 bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20 w-full">
              <div className="mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Your Referral Link</h3>
              </div>
              <div className="grid grid-cols-[1fr,auto] gap-2 items-center w-full">
  <Input 
    value={referralLink}
    readOnly
    className="bg-white border-primary/20" 
  />
  <Button 
    onClick={handleCopyLink} 
    size="sm" 
    className="whitespace-nowrap flex items-center gap-1"
  >
    {copied ? (
      <>
        <Copy className="h-4 w-4" /> Copied
      </>
    ) : (
      <>
        <Copy className="h-4 w-4" /> Copy
      </>
    )}
  </Button>
</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">How it works</h3>
                  <p className="text-sm text-gray-500">Refer friends and family to earn rewards</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="mx-auto w-8 h-8 flex items-center justify-center bg-primary/20 rounded-full text-primary font-bold mb-2">1</div>
                  <h4 className="font-semibold text-sm">Share your link</h4>
                  <p className="text-xs text-gray-500">Send your unique referral link to friends</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="mx-auto w-8 h-8 flex items-center justify-center bg-primary/20 rounded-full text-primary font-bold mb-2">2</div>
                  <h4 className="font-semibold text-sm">They sign up</h4>
                  <p className="text-xs text-gray-500">Your friends create an account</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="mx-auto w-8 h-8 flex items-center justify-center bg-primary/20 rounded-full text-primary font-bold mb-2">3</div>
                  <h4 className="font-semibold text-sm">You earn rewards</h4>
                  <p className="text-xs text-gray-500">Get ₹150 for each successful referral</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <h3 className="font-semibold">Referred Users</h3>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(3*100px)] p-3">
                {referredUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
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
                      {user.status === 'IN_PROCESS' ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Completed • ₹{user.reward}
                        </span>
                      ) : (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Users Referred: {statsData?.total_leads_count}
                </span>
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Total Earnings: ₹{statsData?.total_commission}
                </span>
      </CardFooter>
    </Card>
  );
};
