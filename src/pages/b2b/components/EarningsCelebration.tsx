
import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface EarningsCelebrationProps {
  totalEarnings: number;
  referralCount: number;
}

export const EarningsCelebration: React.FC<EarningsCelebrationProps> = ({ 
  totalEarnings,
  referralCount 
}) => {
  return (
    <Card className="bg-gradient-to-r from-purple-100 to-violet-50 border-primary/10 shadow-sm overflow-hidden">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between relative">
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h3 className="text-lg font-semibold flex items-center gap-2 justify-center md:justify-start">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Referral Achievement Unlocked!</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Congratulations! You've successfully referred {referralCount} users
          </p>
          <div className="text-3xl font-bold text-primary">
            ₹{totalEarnings.toLocaleString()}
          </div>
          <p className="text-sm">Total earnings through referrals</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnRnZHdpb2p2MWF2aXJnMW9tOGF3ZWZ6bnAybWhvNmN0ZDE0cWVsZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/artj92V8o75VPL7AeQ/giphy.gif" 
            alt="Celebration" 
            className="w-32 h-32 object-cover"
          />
        </div>
        
        {/* Sparkle elements */}
        <Sparkles className="absolute top-4 right-8 text-yellow-400 h-4 w-4 animate-pulse" />
        <Sparkles className="absolute bottom-4 left-8 text-yellow-400 h-4 w-4 animate-pulse" />
      </CardContent>
    </Card>
  );
};
