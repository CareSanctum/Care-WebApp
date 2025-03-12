import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PersonalInfoSection } from './onboarding/PersonalInfoSection';
import { ContactSection } from './onboarding/ContactSection';
import { EmergencyContactSection } from './onboarding/EmergencyContactSection';
import { MedicalSection } from './onboarding/MedicalSection';
import { PreferredMedicalSection } from './onboarding/PreferredMedicalSection';
import { LifestyleSection } from './onboarding/LifestyleSection';
import { SpecialNeedsSection } from './onboarding/SpecialNeedsSection';
import { useAppSelector } from '@/store/hooks';
import { addReqeuest } from '@/requests/addRequest';

export const OnboardingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, watch, control, getValues} = useForm();
  const {username, accessToken} = useAppSelector((state) => state.auth);
  const onSubmit = async (data: any) => {
    const values = getValues();
    console.log(values);
    try{
      const response = await addReqeuest(values, username, accessToken);
      if (response.status == 201) {
        // console.log(fullName);
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated!",
        });
        navigate('/profile');
      } else if (response.status == 400) {
        console.log("Error: ", response.data.non_field_error);
      }
    }
    catch (error: any) {
      console.log("Error in handleSave:", error.message);  // ✅ Log error message
      console.log("Error details:", JSON.stringify(error, null, 2)); // ✅ Full error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <PersonalInfoSection register={register} watch={watch} control={control}/>
      <ContactSection register={register} />
      <EmergencyContactSection register={register} />
      <MedicalSection register={register} />
      <PreferredMedicalSection register={register} />
      <LifestyleSection register={register} control={control} />
      <SpecialNeedsSection control={control} />

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={() => navigate("/profile")}>
          Back
        </Button>
        <Button type="submit">
          Save Profile
        </Button>
      </div>
    </form>
  );
};