"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import MyButton from "./ui/my-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileMenu from "./mobile-menu";
import authContext from "@/states/auth-context";
import Textt from "./text";
import AccountMenu from "./account-menu";

function Navbar() {
  const { isLoggedIn, onLogin } = useContext(authContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogin = () => router.push("/login");
  const handleSignup = () => router.push("/signup");

  const onRequestTopupMenuClicked = () => {
    if (isLoggedIn) {
      return "/request-topup/create-topup-link";
    } else {
      return "/request-topup/signup";
    }
  };
  const onSendTopupMenuClicked = () => {
    return "/send-topup/to";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <nav className="flex h-11 w-full flex-row justify-between font-satoshi text-sm font-medium">
      <div className="flex flex-row items-center justify-start gap-20">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={106.54}
            height={24}
            className="hover:cursor-pointer"
          />
        </Link>

        {/* desktop menu */}
        <div className="hidden xl:block">
          <ul className="flex flex-row gap-10 ">
            <li>
              <Link href={onSendTopupMenuClicked()}>Send top-up</Link>
            </li>
            <li>
              <Link href={onRequestTopupMenuClicked()}>Request top-up</Link>
            </li>
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="/help">Help</a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="hidden h-full flex-row justify-end gap-10 xl:flex">
          <div className="flex flex-row gap-2">
            <Image
              src="/assets/icons/ic_round-language.svg"
              alt="logo"
              width={19}
              height={19}
              className="hidden sm:block"
            />

            <select name="language" id="lang" className="bg-transparent">
              <option value="en">English</option>
              <option value="am">Amharic</option>
              <option value="afom">Afan Oromo</option>
              <option value="somali">Somali</option>
            </select>
          </div>

          <div className="relative flex flex-row gap-3">
            {isLoggedIn ? (
              <>
                <button
                  onClick={toggleAccountMenu}
                  className="flex items-center justify-between gap-2"
                >
                  <Image
                    src={"/assets/icons/person-black-icon.svg"}
                    alt={"account-img"}
                    width={14}
                    height={16}
                  />
                  <Textt variant="span1-satoshi">My Account</Textt>
                  <Image
                    src={"/assets/icons/filled-down-icon.svg"}
                    alt={"down-img"}
                    width={6}
                    height={6}
                  />
                </button>

                {isAccountMenuOpen && <AccountMenu />}
              </>
            ) : (
              <>
                <MyButton variant="light-normal" onClick={handleLogin}>
                  Login
                </MyButton>
                <MyButton
                  variant="primary-gradient-top-left"
                  onClick={handleSignup}
                >
                  Signup
                </MyButton>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          {/* mobile menu icon */}
          <button type="button" onClick={toggleMobileMenu}>
            <Image
              src="/assets/icons/menu-icon.svg"
              alt="logo"
              width={24}
              height={24}
              className="block xl:hidden"
            />
          </button>

          {isMobileMenuOpen && isLoggedIn && <AccountMenu />}
          {isMobileMenuOpen && !isLoggedIn && <MobileMenu />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
