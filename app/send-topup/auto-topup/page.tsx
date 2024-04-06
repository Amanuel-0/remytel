"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import MyButton from "@/components/ui/my-button";
import productContext from "@/states/product-context";
import { useRouter } from "next/navigation";
import sendTopupContext from "@/states/send-topup-context";
import withAuth from "@/components/protected-route";

function AutoTopup() {
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const [selectedFrequency, setSelectedFrequency] = React.useState<
    "7" | "14" | "30"
  >("30"); // ["7", "14", "30"]
  const { product } = useContext(productContext);
  const router = useRouter();

  const frequencyOptions = ["7", "14", "30"];

  useEffect(() => {
    setSendTopup({ ...sendTopup, topupFrequency: selectedFrequency });
  }, [selectedFrequency]);

  const handleSelectedFrequency = (option: string) => {
    setSelectedFrequency(option as any);
    setSendTopup({ ...sendTopup, topupFrequency: option });
  };

  const handleSendAutoTopup = () => {
    router.push(`/send-topup/bill`);
  };
  const handleNoThanks = () => {
    setSendTopup({ ...sendTopup, topupFrequency: undefined });
    router.push(`/send-topup/bill`);
  };

  return (
    <>
      <Card className="my-8">
        <div className="flex w-full justify-center">
          <div className="w-fit rounded-full bg-gradient-to-br from-[#80C03F] to-primary p-6">
            <Image
              src={"/assets/icons/schedule-icon-white.svg"}
              alt={"schedule"}
              width={33}
              height={34}
              className="h-6 w-6"
            />
          </div>
        </div>

        <Textt
          variant="h5-craftwork"
          className="mt-6 text-start md:text-center"
        >
          Set Auto top-up
        </Textt>
        <Textt
          variant="p2-satoshi"
          className="mt-4 text-start md:text-center"
        >{`We'll automatically resend ${product.amount} ETB to ${sendTopup.to} so that you don't have to.`}</Textt>

        <Textt
          variant="h5-craftwork"
          className="mt-6 text-start font-semibold md:text-center"
        >
          Choose the Frequency:
        </Textt>

        <div className="mt-6">
          {frequencyOptions.map((option) => {
            if (option === selectedFrequency) {
              return (
                <MyButton
                  key={option}
                  variant="primary-normal"
                  className="mt-[10px]"
                  onClick={() => handleSelectedFrequency(option)}
                >
                  <Textt variant="h6-satoshi" className="text-white">
                    {option} Days
                  </Textt>
                </MyButton>
              );
            }

            return (
              <MyButton
                key={option}
                className={`mt-[10px] border border-black bg-white text-black`}
                onClick={() => handleSelectedFrequency(option)}
              >
                <Textt variant="h6-satoshi">{option} Days</Textt>
              </MyButton>
            );
          })}

          <Textt variant="span1-satoshi" className="mt-6">
            Renews automatically. No extra costs. cancel anytime.
          </Textt>
        </div>

        <div className="mt-10">
          <MyButton
            className="border border-gray-300 bg-white text-black"
            onClick={handleNoThanks}
          >
            <Textt variant="span2-satoshi">No Thanks</Textt>
          </MyButton>
          <MyButton
            variant="primary-normal"
            className="mt-[10px]"
            onClick={handleSendAutoTopup}
          >
            <Textt variant="span2-satoshi" className="text-white">
              Send Auto top-up
            </Textt>
          </MyButton>
        </div>
      </Card>
    </>
  );
}

export default withAuth(AutoTopup);
