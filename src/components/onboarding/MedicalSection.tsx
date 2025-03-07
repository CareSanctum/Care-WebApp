import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';

export const MedicalSection = ({ register }: { register: any }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">Medical History (Optional)</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="healthConditions">Existing Health Conditions</Label>
          <Textarea id="healthConditions" {...register("healthConditions")} placeholder="List any chronic illnesses" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="allergies">Known Allergies</Label>
          <Textarea id="allergies" {...register("allergies")} placeholder="Food, medication, environmental allergies" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="surgeries">Past Surgeries</Label>
          <Textarea id="surgeries" {...register("surgeries")} placeholder="Include dates if available" />
        </div>
      </div>
    </div>
  );
};
