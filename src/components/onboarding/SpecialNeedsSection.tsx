import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller } from "react-hook-form";

export const SpecialNeedsSection = ({ control }: { control: any }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">Special Needs (Optional)</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Controller
            name="mobilityAssistance"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox 
                id="mobilityAssistance" 
                checked={field.value} 
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="mobilityAssistance">Requires Mobility Assistance</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Controller
            name="visionImpairment"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox 
                id="visionImpairment" 
                checked={field.value} 
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="visionImpairment">Has Vision Impairment</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Controller
            name="hearingImpairment"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox 
                id="hearingImpairment" 
                checked={field.value} 
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="hearingImpairment">Has Hearing Impairment</Label>
        </div>
      </div>
    </div>
  );
};