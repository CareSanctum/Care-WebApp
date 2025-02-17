import React from 'react';
import { Phone } from 'lucide-react';
import { BsFiletypePdf } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactProps {
  contact: {
    phone: string;
    altPhone: string;
    email: string;
    address: string;
    pincode: string;
    idProofUrl: string;
  };
}

export const ContactCard = ({ contact }: ContactProps) => {

  const getFileName = (url: string | null) => {
    if (!url) return "No ID Proof"; // Handle case where URL is missing
    return url.split("/").pop() || "Unknown File"; // Extract file name from URL
  };

  const openIDPdf = () => {
    if (contact?.idProofUrl) {
      window.open(contact.idProofUrl, "_blank"); // Opens PDF in a new tab
    }
  };
  const complete_address = contact.address + "," + " - " + contact.pincode;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{contact.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Alternative Phone</p>
            <p className="font-medium">{contact.altPhone}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{contact.email}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">
              { contact.address && contact.pincode ? complete_address : ""}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Id Proof</p>
            <button
              onClick={openIDPdf}
              className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg transition"
            >
            <BsFiletypePdf size={30} color="red" />
            <span className="id-proof-text">{getFileName(contact?.idProofUrl)}</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};