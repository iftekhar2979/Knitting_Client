"use client";

import { useEffect, useRef, useState } from "react";

const OTPInput = ({ value, onChange, length = 6, error }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Synchronize internal state with external value if provided
    if (value && value.length === length) {
      setOtp(value.split(""));
    }
  }, [value, length]);

  const handleChange = (index, e) => {
    const val = e.target.value;
    if (isNaN(val)) return;

    const newOtp = [...otp];
    // Allow only one character
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // Call onChange with the joined string
    const combinedOtp = newOtp.join("");
    onChange(combinedOtp);

    // Move to next input if current one is filled
    if (val && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, length);
    if (isNaN(data)) return;

    const newOtp = data.split("");
    const updatedOtp = [...otp];
    newOtp.forEach((char, i) => {
      if (i < length) updatedOtp[i] = char;
    });
    setOtp(updatedOtp);
    onChange(updatedOtp.join(""));

    // Focus last pasted or first empty
    const nextIndex = Math.min(newOtp.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-between gap-2 sm:gap-4 mt-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          ref={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 rounded-xl focus:ring-4 transition-all outline-none 
            ${error 
              ? "border-red-300 focus:border-red-500 focus:ring-red-100" 
              : "border-gray-200 focus:border-red-600 focus:ring-red-500/10"
            }`}
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default OTPInput;
