import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const SpecialNeedsSection = ({ register }: { register: any }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">Special Needs</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="mobilityAssistance" {...register("mobilityAssistance")} />
          <Label htmlFor="mobilityAssistance">Requires Mobility Assistance</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="visionImpairment" {...register("visionImpairment")} />
          <Label htmlFor="visionImpairment">Has Vision Impairment</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="hearingImpairment" {...register("hearingImpairment")} />
          <Label htmlFor="hearingImpairment">Has Hearing Impairment</Label>
        </div>
      </div>
    </div>
  );
};