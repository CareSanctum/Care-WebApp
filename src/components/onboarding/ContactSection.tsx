import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ContactSection = ({ register }: { register: any }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" {...register("phone")}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="altPhone">Alternate Phone Number</Label>
          <Input id="altPhone" type="tel" {...register("altPhone")} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Current Address</Label>
          <Textarea id="address" {...register("address")}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">PIN Code</Label>
          <Input id="pincode" {...register("pincode")}/>
        </div>
      </div>
    </div>
  );
};