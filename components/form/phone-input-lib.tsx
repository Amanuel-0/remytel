"use client";
import React, { useEffect, useState } from "react";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
//
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneInputLibProps {
  hideDropdown?: boolean;
  value: string;
  onChange: (value: string) => void;
}
function PhoneInputLib({
  hideDropdown = false,
  value,
  onChange,
}: PhoneInputLibProps) {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  //   const [value, setValue] = useState();

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      {/* react-international-phone */}
      <PhoneInput
        defaultCountry="et"
        hideDropdown={hideDropdown}
        value={value}
        onChange={(val: any) => onChange(val)}
        countrySelectorStyleProps={{
          buttonStyle: {
            height: "54px",
            paddingLeft: "20px",
            paddingRight: "10px",
            borderTopLeftRadius: "9999px",
            borderBottomLeftRadius: "9999px",
            border: "2px solid #C6C6C6",
            borderRight: "none",
          },
        }}
        inputStyle={{
          height: "54px",
          width: "100%",
          outline: "none",
          paddingLeft: "10px",
          fontFamily: "satoshi",
          fontSize: "16px",
          borderTopRightRadius: "9999px",
          borderBottomRightRadius: "9999px",
          border: "2px solid #C6C6C6",
          borderLeft: "none",
        }}
        inputProps={{
          contentEditable: false,
        }}
      />

      {/* react-phone-number-input */}
      {/* 
      <PhoneInput
        defaultCountry="US"
        value={value}
        onChange={(val: any) => setValue(val)}
        style={{
          height: "50px",
          width: "100%",
          border: "1px solid #C6C6C6",
          outline: "none",
          padding: "15px",
          borderRadius: "9999px",
        }}
        inputComponent={() => (
          <input
            placeholder="Enter phone number"
            style={{
              width: "100%",
              outline: "none",
              paddingLeft: "10px",
              fontFamily: "satoshi",
              fontSize: "14px",
            }}
          />
        )}
      /> */}
    </>
  );
}

export default PhoneInputLib;
