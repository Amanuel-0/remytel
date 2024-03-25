"use client";
import React from "react";
import Image from "next/image";
import Button from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const navigate = useRouter();

  const handleLogin = () => navigate.push("/signup");
  const handleSignup = () => navigate.push("/login");

  return (
    <nav className="flex h-11 w-full flex-row justify-between font-satoshi text-sm font-medium">
      <div className="flex flex-row items-center justify-start gap-20">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={106.54}
          height={24}
        />
        <div className="hidden xl:block">
          <ul className="flex flex-row gap-10 ">
            <li>
              <Link href="/send-topup/options">Send top-up</Link>
            </li>
            <li>
              <Link href="/request-topup/signup">Request top-up</Link>
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

            <select name="language" id="lang">
              <option value="en">EN</option>
            </select>
          </div>

          <div className="flex w-[173px] flex-row gap-3">
            <Button variant="light-normal" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="primary-gradient-top-left" onClick={handleSignup}>
              Signup
            </Button>
          </div>
        </div>
        {/* mobile menu icon */}
        <Image
          src="/assets/icons/menu-icon.svg"
          alt="logo"
          width={24}
          height={24}
          className="block xl:hidden"
        />
      </div>
    </nav>
  );
}

export default Navbar;
