"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import Card from "./card";
import Button from "./ui/button";
import authContext from "@/states/auth-context";
import Image from "next/image";
import Textt from "./text";

function AccountMenu() {
  const { isLoggedIn, onLogin } = useContext(authContext);
  const navigate = useRouter();

  const handleLogin = () => navigate.push("/login");
  const handleSignup = () => navigate.push("/signup");

  const router = useRouter();

  const logout = () => {
    router.push("/", { scroll: true });
  };

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
          <div>
            <Textt variant="h4-satoshi" className="text-start">
              Oumer Sualih
            </Textt>
            <Textt variant="span1-satoshi" className="mb-3 mt-2 text-start">
              251935425899
            </Textt>
          </div>

          <hr />

          {/* sec 1 */}
          <ul className="flex w-full flex-col">
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="#">History</Link>
            </li>
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="#">Auto top-up</Link>
            </li>
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="#">Contacts</Link>
            </li>
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="#">Profile Settings</Link>
            </li>
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="#">Request top-up</Link>
            </li>
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="#">Refer a Friend</Link>
            </li>
          </ul>

          <hr />

          <button className="mt-4">
            <Textt variant="h6-satoshi" className="text-red-500">
              Log Out
            </Textt>
          </button>
        </Card>
      </motion.div>
    </>
  );
}

export default AccountMenu;
