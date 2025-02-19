import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';

export const MedicalSection = ({ register }: { register: any }) => {
  const [file, setFile] = useState<File | null>(null);
  const {username, accessToken} = useAppSelector((state) => state.auth);
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
      formData.append("name", "current_prescriptions");
      formData.append("user_name", username);
  
      //Sending via Axios
      try{
        const response = await axios.post('http://192.168.1.66:8080/api/upload-file/', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data' 
          },
        });
        console.log('File uploaded successfully:', response.data);
        return response;
      }
      catch(error){
        console.error('Error uploading file:', error);
        throw error;
      }
    
    };

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
          <Label htmlFor="prescriptions">Current Prescriptions upload</Label>
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
          <Label htmlFor="surgeries">Past Surgeries</Label>
          <Textarea id="surgeries" {...register("surgeries")} placeholder="Include dates if available" />
        </div>
      </div>
    </div>
  );
};
