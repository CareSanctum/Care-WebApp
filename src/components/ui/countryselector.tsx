import * as React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CountryCodeSelector = ({ value, onChange }) => {
    return (
      <PhoneInput
        country="in" // Set the country to India only
        value={value}
        onChange={onChange}
        inputStyle={{
          width: "90%",
          height: "40px",
          fontSize: "16px",
        }}
        buttonStyle={{
          border: "none",
          backgroundColor: "transparent",
        }}
      />
    );
  };
  
  export default CountryCodeSelector;