import React from 'react';
import { Heart } from 'lucide-react';
import { BsFiletypePdf } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MedicalInfoProps {
  medicalInfo: {
    healthConditions: string;
    allergies: string;
    surgeries: string;
    doctorName: string;
    doctorContact: string;
    preferredHospital: string;
    PrescsUrl: string;
  };
}

export const MedicalInfoCard = ({ medicalInfo }: MedicalInfoProps) => {

  const openPrescPdf = () => {
    if (medicalInfo?.PrescsUrl) {
      window.open(medicalInfo.PrescsUrl, "_blank"); // Opens PDF in a new tab
    }
  }
  const getFileName = (url: string | null) => {
    if (!url) return "No Prescriptions"; // Handle case where URL is missing
    return url.split("/").pop() || "Unknown File"; // Extract file name from URL
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Medical Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Health Conditions</p>
            <p className="font-medium">{medicalInfo.healthConditions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Allergies</p>
            <p className="font-medium">{medicalInfo.allergies}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Past Surgeries</p>
            <p className="font-medium">{medicalInfo.surgeries}</p>
          </div>
          <div>
              <p className="text-sm text-gray-500">Preferred Doctor</p>
              <p className="font-medium">{medicalInfo.doctorName}</p>
          </div>
          <div>
              <p className="text-sm text-gray-500">Doctor's Contact</p>
              <p className="font-medium">{medicalInfo.doctorContact}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Preferred Hospital/Clinic</p>
            <p className="font-medium">{medicalInfo.preferredHospital}</p>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Current Prescriptions</p>
            <button
              onClick={openPrescPdf}
              className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg transition"
            >
            <BsFiletypePdf size={30} color="red" />
            <span className="id-proof-text">{getFileName(medicalInfo?.PrescsUrl)}</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};