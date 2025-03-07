
import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Users, Trophy, Award, Medal, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ReferralUserType = {
  name: string;
  status: 'pending' | 'completed';
  date: string;
  reward?: number;
};

// Leaderboard data type
type LeaderboardEntryType = {
  name: string;
  referrals: number;
  earnings: number;
  avatar?: string;
};

export const ReferralTracking = () => {
  const { toast } = useToast();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  // Generate referral code
  const referralCode = useMemo(() => {
    const userPart = "caresanctum";
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${userPart}_${randomPart}`;
  }, []);

  const referralLink = `https://preview--gentlecarehub.lovable.app/signup?referal_code=${referralCode}`;
  
  const [copied, setCopied] = useState(false);

  // Sample data for referred users
  const referredUsers: ReferralUserType[] = [
    { name: "Sanjay Kumar", status: "completed", date: "2023-12-10", reward: 150 },
    { name: "Priya Sharma", status: "pending", date: "2023-12-15" },
    { name: "Rajesh Patel", status: "completed", date: "2023-11-28", reward: 150 },
    { name: "Anita Desai", status: "completed", date: "2023-11-20", reward: 150 },
    { name: "Vikram Singh", status: "pending", date: "2023-12-18" },
  ];

  // Sample leaderboard data
  const leaderboardData: LeaderboardEntryType[] = [
    { name: "Rohan Mehta", referrals: 42, earnings: 6300 },
    { name: "Shreya Gupta", referrals: 38, earnings: 5700 },
    { name: "Vikram Malhotra", referrals: 31, earnings: 4650 },
    { name: "Pawan Agarwal", referrals: 25, earnings: 3500 },
    { name: "Anita Reddy", referrals: 23, earnings: 3450 },
    { name: "Rahul Shah", referrals: 21, earnings: 3150 },
    { name: "Meera Joshi", referrals: 18, earnings: 2700 },
  ];
  
  // Current user's position in the leaderboard (index of Pawan Agarwal)
  const currentUserPosition = leaderboardData.findIndex(entry => entry.name === "Pawan Agarwal");

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
            <div className="flex justify-center items-end gap-2 mb-6">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="h-12 w-12 border-2 border-gray-300">
                  <AvatarFallback className="bg-gray-200 text-gray-700">{leaderboardData[1].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-700 font-bold mt-2">2</div>
                <p className="text-xs mt-1 font-medium">{leaderboardData[1].name.split(' ')[0]}</p>
                <p className="text-xs">₹{leaderboardData[1].earnings}</p>
              </div>
              
              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-amber-500">
                    <AvatarFallback className="bg-amber-100 text-amber-700">{leaderboardData[0].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Medal className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full text-white font-bold mt-2">1</div>
                <p className="text-xs mt-1 font-medium">{leaderboardData[0].name.split(' ')[0]}</p>
                <p className="text-xs">₹{leaderboardData[0].earnings}</p>
              </div>
              
              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="h-12 w-12 border-2 border-amber-700">
                  <AvatarFallback className="bg-amber-50 text-amber-800">{leaderboardData[2].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center w-8 h-8 bg-amber-700 rounded-full text-white font-bold mt-2">3</div>
                <p className="text-xs mt-1 font-medium">{leaderboardData[2].name.split(' ')[0]}</p>
                <p className="text-xs">₹{leaderboardData[2].earnings}</p>
              </div>
            </div>
            
            {/* Your Ranking */}
            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
              <h3 className="text-sm font-semibold text-center mb-2">Your Current Ranking</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-7 h-7 bg-primary text-white rounded-full text-sm font-bold">
                    {currentUserPosition + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pawan Agarwal</p>
                    <p className="text-xs text-gray-600">{leaderboardData[currentUserPosition].referrals} referrals</p>
                  </div>
                </div>
                <div className="text-lg font-bold text-primary">₹{leaderboardData[currentUserPosition].earnings}</div>
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
            <TabsTrigger value="rewards" className="flex-1">My Rewards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="share" className="space-y-4">
            <div className="mt-4 bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
              <div className="mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Your Referral Link</h3>
              </div>
              <div className="flex gap-2 items-center">
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
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Total: {referredUsers.length}
                </span>
              </div>
              
              {referredUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-xs text-gray-500">Referred on {new Date(user.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    {user.status === 'completed' ? (
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
          </TabsContent>
          
          <TabsContent value="rewards">
            <div className="space-y-4 mt-4">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-amber-500" />
                  <div>
                    <h3 className="font-semibold">Total Rewards Earned</h3>
                    <p className="text-sm text-gray-600">Keep referring to earn more!</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-amber-600">₹450</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3">Recent Rewards</h3>
                <div className="space-y-2">
                  {referredUsers
                    .filter(user => user.status === 'completed')
                    .map((user, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <span>{user.name}</span>
                        </div>
                        <div className="font-medium">₹{user.reward}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button 
          onClick={handleCopyLink}
          variant="outline"
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy Referral Link"}
        </Button>
      </CardFooter>
    </Card>
  );
};
