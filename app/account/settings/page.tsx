"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Card from "@/components/card";
import Textt from "@/components/text";
import IconButton from "@/components/ui/icon-button";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import withAuth from "@/components/protected-route";
import AccountNav from "../account-nav";
import userContext from "@/states/user-context";
import { useRouter } from "next-nprogress-bar";

function Settings() {
  const {
    user: { user },
  } = useContext(userContext);
  const router = useRouter();

  const navigateToEditSetting = () => {
    router.push("/account/settings/edit");
  };

  return (
    <div>
      <AccountNav />

      {/*  */}
      <section className="my-[10px] flex h-full w-full flex-col gap-[10px] md:flex-row">
        <Card className="w-full md:max-w-[65%]">
          <div className="mt-2 flex items-center justify-between">
            <Textt variant="h3-craftwork" className="text-start">
              Personal Details
            </Textt>

            <IconButton className="h-8 w-8" onClick={navigateToEditSetting}>
              <Image
                src={"/assets/icons/edit-icon.svg"}
                alt={"edit-icon"}
                width={14}
                height={14}
              />
            </IconButton>
          </div>

          <div className="mt-5">
            {/*  */}
            <div className={`flex items-center justify-start gap-5`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#80C03F] to-[#2CA342] text-white `}
              >
                <Image
                  src={"/assets/icons/account-white.svg"}
                  alt={"account-white"}
                  width={12}
                  height={15}
                />
              </div>

              <Textt variant="h6-satoshi" className="text-start">
                {user.firstName} {user.lastName}
                {/* Oumer Sualih */}
              </Textt>
            </div>

            {/*  */}
            <div className="flex items-center justify-between border-b border-b-[#EAEAEA] py-5 md:justify-start">
              <Textt variant="span2-satoshi" className="text-start md:w-1/4">
                Date of birth
              </Textt>

              <Textt variant="span1-satoshi" className="text-start">
                DD/MM/YYYY
              </Textt>
            </div>

            {/*  */}
            <div className="flex items-center justify-between border-b border-b-[#EAEAEA] py-5 md:justify-start">
              <Textt variant="span2-satoshi" className="text-start md:w-1/4">
                Phone number
              </Textt>

              <Textt variant="span1-satoshi" className="text-start">
                {user.phoneNumber ?? "No phone number"}
                {/* +251935425899 */}
              </Textt>
            </div>

            {/*  */}
            <div className="flex items-center justify-between border-b border-b-[#EAEAEA] py-5 md:justify-start">
              <Textt variant="span2-satoshi" className="text-start md:w-1/4">
                Email address
              </Textt>

              <Textt variant="span1-satoshi" className="text-start">
                {user.email ?? "No email"}
                {/* oumersualih@gmail.com */}
              </Textt>
            </div>

            {/*  */}
            <Textt variant="span2-satoshi" className="py-5 text-start">
              {"We care about your data and it's only used in line With our "}
              <Link href={"#"} className="inline-block text-start text-primary">
                Privacy notice
              </Link>
            </Textt>
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="w-full md:max-w-[35%]">
          <Card className="mb-[10px] h-full w-full">
            <Textt variant="h3-craftwork" className="text-start">
              Payment methods
            </Textt>

            <div className="mt-5 rounded-[10px] border border-[#DBDBDB] p-5">
              <div className="mt-2 flex w-full items-center justify-between">
                <div>
                  <Image
                    src={"/assets/images/visa-logo.svg"}
                    alt={"edit-icon"}
                    width={64}
                    height={20}
                  />
                </div>

                <IconButton className="h-8 w-8" onClick={navigateToEditSetting}>
                  <Image
                    src={"/assets/icons/edit-icon.svg"}
                    alt={"edit-icon"}
                    width={14}
                    height={14}
                  />
                </IconButton>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between py-1 md:justify-start">
                  <Textt
                    variant="span2-satoshi"
                    className="text-start md:w-2/5"
                  >
                    Card Number
                  </Textt>

                  <Textt variant="span1-satoshi" className="text-start">
                    **** 3456
                  </Textt>
                </div>
                <div className="flex items-center justify-between py-1 md:justify-start">
                  <Textt
                    variant="span2-satoshi"
                    className="text-start md:w-2/5"
                  >
                    Expiry Date
                  </Textt>

                  <Textt variant="span1-satoshi" className="text-start">
                    05/28
                  </Textt>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* preferences */}
      <Card className="mb-[10px] h-full w-full">
        <Textt variant="h3-craftwork" className="text-start">
          Contact Preferences
        </Textt>

        <div className="mt-5">
          <div className="flex flex-col items-center justify-between gap-4 border-b border-b-[#D0D0D0] py-4 md:flex-row md:gap-0">
            <Textt variant="span1-satoshi" className="max-w-[390px] text-start">
              Let me know about relevant and exclusive Ding discounts and
              promotions, especially for me.
            </Textt>
            <div className="flex gap-10 md:pr-24">
              <div className="flex items-center justify-start gap-7">
                <label htmlFor="id">Email</label>
                <Switch id="email" />
              </div>

              <div className="flex items-center justify-start gap-7">
                <label htmlFor="id">SMS</label>
                <Switch id="email" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row md:gap-0">
            <Textt variant="span1-satoshi" className="max-w-[390px] text-start">
              Show/Hide my name in text messages, notifications and emails sent
              to other Ding users.
            </Textt>
            <div className="flex items-center justify-start gap-7 md:pr-24">
              <label htmlFor="id">Show</label>
              <Switch id="email" checked={user.notificationsEnabled} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default withAuth(Settings);
