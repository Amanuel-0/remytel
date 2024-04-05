"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "./card";
import Image from "next/image";
import MyButton from "./ui/my-button";
// import authContext from "@/state/auth-context";
// import LanguageOption from "./LanguageOption";

function objectToBoolean(obj: object) {
  return Object.keys(obj).length > 0;
}
function MobileMenu() {
  const navigate = useRouter();

  const handleLogin = () => navigate.push("/login");
  const handleSignup = () => navigate.push("/signup");

  //   const { isLoggedIn, onLogin } = useContext(authContext);
  const [loginLocal, setLoginLocal] = useState<any>();

  const router = useRouter();

  const logout = () => {
    // onLogin(false);
    router.push("/", { scroll: true });
  };

  //   useEffect(() => {
  // if (objectToBoolean(locale)) {
  //   const loginTranslation = locale["locale"]?.locale?.login;
  // console.log("loginTranslation", locale);
  //   setLoginLocal(loginTranslation);
  // }
  //   }, [locale]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, x: 0, translateY: -10 }}
        className=" absolute right-0 top-[100%] z-50 min-h-[156px] w-[207px] drop-shadow-sm"
      >
        {/* mobile menu */}
        <Card className="shadow-xl">
          {/* sec 1 */}
          <ul className="flex w-full flex-col">
            <li className="h-10 w-full">
              <Link href="/send-topup/options">Send top-up</Link>
            </li>
            <li className="h-10">
              <Link href="/request-topup/signup">Request top-up</Link>
            </li>
            <li className="h-10">
              <a href="#">Company</a>
            </li>
            <li className="h-10">
              <a href="/help">Help</a>
            </li>
          </ul>

          {/* sec 2 */}
          <div className="flex h-full flex-col justify-end">
            <div className="flex flex-row gap-2">
              <Image
                src="/assets/icons/ic_round-language.svg"
                alt="logo"
                width={19}
                height={19}
              />

              <select name="language" id="lang" className="bg-transparent">
                <option value="en" className="w-9">
                  EN
                </option>
                {/* <option value="am">Amharic</option>
                <option value="afom">Afan Oromo</option>
                <option value="somali">Somali</option> */}
              </select>
            </div>

            <div className="mt-4 w-[173px]">
              <MyButton variant="light-normal" onClick={handleLogin}>
                Login
              </MyButton>
              <MyButton
                variant="primary-gradient-top-left"
                onClick={handleSignup}
                className="mt-2"
              >
                Signup
              </MyButton>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
}

export default MobileMenu;
