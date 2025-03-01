import React from 'react';
import profileLogo from "../assets/CS_logo_cropped_final.png";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src={profileLogo}  
        alt="Care Sanctum Logo" 
        className="h-14 w-16 transform scale-[2.1]"
      />
    </div>
  );
};