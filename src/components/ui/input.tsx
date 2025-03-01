import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  validationRules?: React.ComponentProps<"input">; //for applying validation rules 
  confirmPassword?: string; // For password confirmation
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, validationRules, confirmPassword, onChange,  ...props }, ref) => {
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const validity = input.validity;
      let message = "";
      if (validity.valueMissing) {
        message = "This field is required.";
      } else if (validity.tooShort) {
        message = `Must be at least ${input.minLength} characters.`;
      } else if (validity.patternMismatch) {
        message = type === "password"
          ? "Password must contain at least one number."
          : "Invalid format.";
      } else if (type === "tel" && input.value.length !== 10) {
        message = "Number must be exactly 10 digits.";
      } else if (type === "email" && validity.typeMismatch) {
        message = "Please enter a valid email address.";
      } else if (type === "password" && confirmPassword !== undefined && input.value !== confirmPassword) {
        message = "Passwords do not match.";
      }

      setErrorMessage(message);
      if (onChange) onChange(e);
    };
    return (
      <div>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...validationRules}
          {...props}
          onChange={handleValidation}
          
        />
        {errorMessage && <p className="text-red-500 font-medium text-sm mt-1">{errorMessage}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
