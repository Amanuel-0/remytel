"use client";
import React from "react";
import Image from "next/image";
import Card from "@/components/card";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import withAuth from "@/components/protected-route";
import AccountNav from "../account-nav";
import CancelAutoTopupModal from "@/components/cancel-auto-topup-modal";

function AutoTopups() {
  const [openCancelAutoTopupModal, setOpenCancelAutoTopupModal] =
    React.useState(false);

  return (
    <div>
      {/* cancel autotopup modal   */}
      <CancelAutoTopupModal
        open={openCancelAutoTopupModal}
        onClose={() => setOpenCancelAutoTopupModal(false)}
      />

      {/*  */}
      <AccountNav />

      {/*  */}
      <section className="my-[10px]">
        <Card className="flex w-full flex-col justify-between gap-5 md:flex-row md:flex-wrap md:gap-5">
          {[1, 2].map((item, index) => (
            <div
              key={index}
              className="w-full rounded-[20px] border p-5 md:w-[49%]"
            >
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

                <div>
                  <Textt variant="h6-satoshi" className="text-start">
                    Brook
                  </Textt>
                  <Textt variant="span1-satoshi" className="mt-2 text-start">
                    +251938649359
                  </Textt>
                </div>
              </div>

              {/*  */}
              <div className="flex items-center justify-between border-b py-5">
                <div>
                  <Textt variant="span1-satoshi" className="block text-start">
                    Receives
                  </Textt>
                  <Textt variant="h6-satoshi" className="mt-2 block text-start">
                    138 ETB
                  </Textt>
                </div>

                <div className="">
                  <Textt variant="span1-satoshi" className="block text-start">
                    Auto top-up
                  </Textt>
                  <Textt
                    variant="h6-satoshi"
                    className="mt-2 block text-start text-primary"
                  >
                    Every 30 days
                  </Textt>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 md:flex-row md:justify-between">
                <div className="flex items-center justify-start gap-2">
                  <Image
                    src={"/assets/icons/arrow-wraped-back-primary-arrow.svg"}
                    alt={"account-white"}
                    width={14}
                    height={12}
                  />
                  <Textt
                    variant="span1-satoshi"
                    className="whitespace-nowrap text-start"
                  >
                    Next billing date 21/4/2024
                  </Textt>
                </div>

                <MyButton
                  type="button"
                  onClick={() => setOpenCancelAutoTopupModal(true)}
                  className="max-w-[164px] border border-[#C7C7C7]"
                >
                  <Textt variant="span1-satoshi">Cancel auto top-up</Textt>
                </MyButton>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}

export default withAuth(AutoTopups);
