"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import Button from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Bill() {
  const [showPaymentDetail, setShowPaymentDetail] = React.useState(false);

  const handleTogglePaymentDetail = () => {
    setShowPaymentDetail(!showPaymentDetail);
  };

  const navigate = useRouter();

  const handleClick = () => navigate.push("/send-topup/payment");

  return (
    <>
      <Textt variant="h4-craftwork">Your Order</Textt>

      <div className="mt-5">
        <TopupToDetailCard />
      </div>

      <div className="mt-5">
        <TopupOptionDetailCard />
      </div>

      <Card className="my-8">
        <div className="flex items-center justify-between">
          <div>
            <Textt variant="span2-satoshi" className="block text-start">
              Receives
            </Textt>
            <Textt variant="h3-satoshi" className="mt-2 block text-start">
              138 ETB
            </Textt>
          </div>

          <div className="">
            <Textt variant="span2-satoshi" className="block text-start">
              Auto top-up
            </Textt>
            <Textt variant="h3-satoshi" className="mt-2 block text-start">
              Every 30 days
            </Textt>
          </div>
        </div>

        <button className="my-6 flex items-center justify-start gap-2">
          <Image
            src={"/assets/icons/gg_add.svg"}
            alt={"edit-icon"}
            width={24}
            height={24}
          />
          <Textt variant="span1-satoshi" className="text-primary">
            Add a Promo Code
          </Textt>
        </button>

        <hr />

        <div className="mt-6">
          <div>
            <button
              className="flex w-full justify-between"
              onClick={handleTogglePaymentDetail}
            >
              <Textt variant="h6-satoshi" className="text-start">
                Your Total
              </Textt>

              <div className="flex items-center justify-end gap-2">
                <Textt variant="span1-satoshi">19.18 USD</Textt>

                <Image
                  src={
                    showPaymentDetail
                      ? "/assets/icons/up-icon.svg"
                      : "/assets/icons/down-icon.svg"
                  }
                  alt=""
                  width={12}
                  height={8}
                />
              </div>
            </button>

            <div className={`${showPaymentDetail ? "block" : "hidden"} mt-2`}>
              <div className="flex w-full justify-between">
                <Textt variant="h6-satoshi" className="text-start">
                  Top-up Subtotal
                </Textt>

                <Textt variant="span1-satoshi">19.18 USD</Textt>
              </div>

              <div className="mt-2 flex w-full justify-between">
                <Textt variant="h6-satoshi" className="text-start">
                  Top-up Fee
                </Textt>

                <Textt variant="span1-satoshi">2.69 USD</Textt>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="primary-normal"
          className="mb-[10px] mt-10"
          onClick={handleClick}
        >
          <Textt variant="h5-satoshi" className="text-white">
            Continue Payment
          </Textt>
        </Button>
      </Card>
    </>
  );
}

export default Bill;
