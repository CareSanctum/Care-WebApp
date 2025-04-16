import { TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { OverlayText } from "./OverlayText"
import { VideoIcon } from "lucide-react";

export const BlurredScheduler = ({ RestrictedText }: { RestrictedText: string }) => {
    return (
        <div className="relative">
              <div className="p-4 bg-gray-50 rounded-lg blur-sm pointer-events-none opacity-90">
                <h3 className="font-medium mb-2">Next Teleconsultation</h3>
                  <p className="text-sm text-gray-600">No scheduled visit</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline">
                    Reschedule
                  </Button>
                  <Button className="flex items-center gap-2" variant="outline">
                    <VideoIcon className="h-4 w-4" />
                    Join Session
                  </Button>
                </div>
              </div>
      <OverlayText RestrictedText={RestrictedText} />
      </div>
    )
}