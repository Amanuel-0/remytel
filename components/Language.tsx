"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ILang {
  id: number;
  code: string;
  name: string;
  selected: boolean;
}

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [languages, setLanguage] = useState<ILang[]>([
    { id: 1, code: "en", name: "English", selected: true },
    { id: 2, code: "am", name: "Amharic", selected: false },
    { id: 3, code: "afom", name: "Afan Oromo", selected: false },
    { id: 4, code: "somali", name: "Somali", selected: false },
  ]);

  const handleLanguageChange = (lang: ILang) => {
    // setSelectedLanguage(event.target.value);
    setSelectedLanguage(lang.code);

    // update the language state array up on change

    const newLang = languages.map((lg) => {
      if (lg.code === lang.code) {
        return { ...lang, selected: true };
      }
      return { ...lg, selected: false };
    });

    setLanguage(newLang);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <Image
        src="/assets/icons/ic_round-language.svg"
        alt="logo"
        width={19}
        height={19}
        className="hidden sm:block"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            {selectedLanguage === "en"
              ? "EN"
              : selectedLanguage === "am"
                ? "AM"
                : selectedLanguage === "afom"
                  ? "AFOM"
                  : "SOM"}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px] rounded-xl">
          {languages.map((language, index) => (
            <button
              key={index}
              className="flex h-11 w-full items-center justify-start gap-6 p-2 "
              onClick={() => handleLanguageChange(language)}
            >
              <span>{language.name}</span>
              {language.selected && (
                <Image
                  src="/assets/images/check.svg"
                  alt="logo"
                  width={12}
                  height={19}
                  className="hidden sm:block"
                />
              )}
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Image
        src={"/assets/icons/filled-down-icon.svg"}
        alt={"down-img"}
        width={6}
        height={6}
      />
    </div>
  );
}
