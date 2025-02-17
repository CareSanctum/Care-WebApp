import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { sendfileRequest } from '@/requests/sendfileRequest';

export const PersonalInfoSection = ({ register, watch, control }: { register: any, watch: any, control: any }) => {
  const locationStatus = watch('locationStatus');
  const {username, accessToken} = useAppSelector((state) => state.auth);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]); // Save the file in state
    }
  };

  const handlefileUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    // Create a FormData object
    const sanitizedFileName = file.name.replace(/\s+/g, "_"); 
    const formData = new FormData();
    formData.append("file", new File([file], sanitizedFileName, { type: file.type })); // Append the file with a field name "file"
    formData.append("name", "id_proof");
    formData.append("user_name", username);

    //Sending via Axios
    sendfileRequest(formData, accessToken);
  
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")}/>
          {/* <input 
          className= "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          id="fullName" {...register("fullName", { required: true }) }/> */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth </Label>
          <Input id="dob" type="date" {...register("dob")}/>
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <Controller
            name="gender"
            control={control}
            defaultValue="male"
            render={({ field }) => (
              <RadioGroup {...field} onValueChange={field.onChange}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </div>
              </RadioGroup>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Controller name="blood_group"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input id="height" type="number" {...register("height")}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg) </Label>
          <Input id="weight" type="number" {...register("weight")}/>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="idProof">ID Proof Upload </Label>
          <input 
          className= "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          id="idProof" type="file"  onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
          <div className="flex justify-center">
          <button onClick={handlefileUpload}
          disabled={!file}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >Upload</button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="wakeUpTime">Usual Wake Up Time </Label>
          <Input id="wakeUpTime" type="time" {...register("wakeUpTime")}/>
        </div>
        <div className="space-y-2">
          <Label>Current Location Status </Label>
          <Controller
            name="locationStatus"
            control={control}
            defaultValue="male"
            render={({ field }) => (
             <RadioGroup defaultValue="home" {...register("locationStatus")} required>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home">At Home</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="travelling" id="travelling" />
                  <Label htmlFor="travelling">Travelling</Label>
                </div>
              </div>
            </RadioGroup>
          )}
        />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expectedReturn">
            Expected Return Date
            {locationStatus === 'travelling'}
          </Label>
          <Input 
            id="expectedReturn" 
            type="date" 
            {...register("expectedReturn", { 
              required: locationStatus === 'travelling' 
            })} 
          />
        </div>
      </div>
    </div>
  );
};