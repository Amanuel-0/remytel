"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Card from "./card";
import authContext from "@/states/auth-context";
import Textt from "./text";
import userContext from "@/states/user-context";
import { LocalStorageUtil } from "@/utils";
import { User } from "@/models";
import sendTopupContext from "@/states/send-topup-context";
import topupRequestContext from "@/states/request-topup-context";
import Image from "next/image";

function AccountMenu({ ref }: { ref?: React.MutableRefObject<null> }) {
  const { onLogin } = useContext(authContext);
  const { user, onUser } = useContext(userContext);
  const { setSendTopup } = useContext(sendTopupContext);
  const { setTopupRequest } = useContext(topupRequestContext);
  const router = useRouter();

  const logout = () => {
    // clear context data
    onLogin(false);
    onUser({} as User);
    setSendTopup({} as any);
    setTopupRequest({} as any);
    // clear local storage data (this are actually cookies)
    LocalStorageUtil.removeItem("isLoggedIn");
    LocalStorageUtil.removeItem("user");
    LocalStorageUtil.removeItem("product");
    LocalStorageUtil.removeItem("sendtopup");
    LocalStorageUtil.removeItem("requesttopup");

    router.push("/", { scroll: true });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, x: 0, translateY: -10 }}
        className=" absolute right-0 top-[100%] z-50 min-h-[156px] w-[207px] drop-shadow-sm"
        ref={ref}
      >
        {/* mobile menu */}
        <Card className="relative shadow-xl">
          <Image
            src={"/assets/images/account-menu-white-top-tiangle.svg"}
            alt={"menu-trianlg"}
            width={13}
            height={10}
            className="absolute right-10 top-[-10px]"
          />

          <Link href={"/account/home"} className="">
            <div className="flex justify-between gap-2">
              <div>
                <Textt variant="h4-satoshi" className="text-start">
                  {!user.user.firstName && !user.user.lastName && "Account"}
                  {user.user.firstName} {user.user.lastName}
                </Textt>
                <Textt variant="span2-satoshi" className="mb-3 mt-2 text-start">
                  {user.user.phoneNumber ?? "No phone number"}
                </Textt>
              </div>

              <Image
                src={"/assets/icons/dropdown-icon.svg"}
                alt="dropdown-rotated"
                width={6}
                height={6}
                className="-rotate-90 transform "
              />
            </div>
          </Link>

          <hr />

          {/* sec 1 */}
          <ul className="flex w-full flex-col">
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="/account/history">History</Link>
            </li>
            <hr />
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="/account/auto-topups">Auto top-up</Link>
            </li>
            <hr />
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="/account/contacts">Contacts</Link>
            </li>
            <hr />
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="/account/settings">Profile Settings</Link>
            </li>
            {/* <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="/request-topup/create-topup-link">
                Request top-up
              </Link>
            </li>
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="#">Refer a Friend</Link>
            </li> */}
          </ul>

          <hr />

          <button type="button" className="mt-4" onClick={logout}>
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
