"use client";
import React from "react";
import Image from "next/image";
import Textt from "../text";

interface ICountry {
  id: number;
  url: string;
  code: string;
}

const countries: ICountry[] = [
  { id: 1, url: "/assets/images/flags/american-flag.png", code: "+1" },
  { id: 2, url: "/assets/images/flags/ethiopian-flag.png", code: "+251" },
];

interface IPhoneInputProps {
  className?: string;
}
function PhoneInput({ className }: IPhoneInputProps) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<ICountry>(
    countries[0],
  );

  const handleSelectCountry = (country: ICountry) => {
    setSelectedCountry(country);
  };

  return (
    <label
      className={`flex items-center rounded-full border-2 border-[#C6C6C6] font-[sans-serif] ${className}`}
    >
      <div className="relative">
        <button
          type="button"
          className="flex items-center gap-1 px-5 text-base text-black"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedCountry && (
            <>
              <Image src={selectedCountry.url} alt="" width={30} height={30} />
              <Image
                src="/assets/icons/dropdown-icon.svg"
                alt=""
                width={6}
                height={6}
              />
              <Textt variant="span1-satoshi">{selectedCountry.code}</Textt>
            </>
          )}
        </button>

        {showDropdown && (
          <ul className="absolute top-9 z-50 min-w-[150px] bg-white py-2 shadow-lg">
            {countries.map((country) => (
              <li
                key={country.id}
                className="cursor-pointer px-4 py-2 text-base text-black hover:bg-blue-50"
                onClick={() => handleSelectCountry(country)}
              >
                {country.code}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="tel"
        placeholder="Enter your phone"
        className="h-14 w-full rounded-full px-3 py-3 text-sm leading-[16.016px] text-black outline-none placeholder:font-satoshi placeholder:text-sm"
      />
    </label>
  );
}

export default PhoneInput;
