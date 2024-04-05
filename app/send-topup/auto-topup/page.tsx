"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import React, { useCallback, useContext } from "react";
import Image from "next/image";
import MyButton from "@/components/ui/my-button";
import productContext from "@/states/product-context";
import { useSearchParams, useRouter } from "next/navigation";

function AutoTopup() {
  const [selectedFrequency, setSelectedFrequency] = React.useState<
    "7" | "14" | "30"
  >("30"); // ["7", "14", "30"]
  const { product } = useContext(productContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const senderPhone = searchParams.get("from") ?? "";
  const receiverPhone = searchParams.get("to") ?? "";

  const frequencyOptions = ["7", "14", "30"];

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name?: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name && value) params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleSendAutoTopup = () => {
    router.push(
      `/send-topup/bill?${createQueryString("topup-frq", selectedFrequency)}`,
    );
  };
  const handleNoThanks = () => {
    router.push(`/send-topup/bill?${createQueryString()}`);
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
        >{`We'll automatically resend ${product.amount} ETB to ${receiverPhone} so that you don't have to.`}</Textt>

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
                  onClick={() => setSelectedFrequency(option as any)}
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
                onClick={() => setSelectedFrequency(option as any)}
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

export default AutoTopup;
