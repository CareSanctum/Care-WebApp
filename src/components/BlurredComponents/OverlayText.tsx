import { LockKeyhole } from "lucide-react";
import { Button } from "../ui/button";
interface OverlayTextProps {
    RestrictedText: string;
}
export const OverlayText = ({ RestrictedText }: OverlayTextProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-transparent rounded-2xl  px-6 py-4 flex flex-col items-center text-center space-y-2 border-1.5 border-black/30">
        <span className="text-sm text-black font-semibold">{RestrictedText}</span>
        <Button onClick={() => window.open('https://caresanctum.com/plans', '_blank')}>
          Upgrade Now
        </Button>
      </div>
    </div>
  )
}
export const OverlayTextwithoutButton = ({ RestrictedText }: OverlayTextProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-2xl px-6 py-4 flex flex-col items-center text-center space-y-2">
        <span className="text-sm text-black font-semibold">{RestrictedText}</span>
      </div>
    </div>
  );
};

