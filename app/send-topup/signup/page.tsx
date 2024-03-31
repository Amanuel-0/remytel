"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import React, { useCallback, useEffect } from "react";
import Button from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import PhoneInputLib from "@/components/form/phone-input-lib";

function SignupSendTopup() {
  const [senderPhoneNumber, setSenderPhoneNumber] = React.useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleEditPhone = () => {
    router.push(`/?${createQueryString("to", searchParams.get("to") || "")}`);
  };
  const handleProductOrPlanEdit = () => {
    if (searchParams.get("productId")) {
      router.push(
        `/send-topup/options?${createQueryString("productId", searchParams.get("productId") || "")}`,
      );
    }
    if (searchParams.get("planId")) {
      router.push(
        `/send-topup/options?${createQueryString("planId", searchParams.get("planId") || "")}`,
      );
    }
  };

  const handleSignup = () => {
    router.push(
      `/send-topup/verify?${createQueryString("from", senderPhoneNumber)}`,
    );
  };

  useEffect(() => {
    console.log("senderPhoneNumber", senderPhoneNumber);
  }, [senderPhoneNumber]);

  const navigate = useRouter();

  useEffect(() => {
    const phone = searchParams.get("from") || "";
    setSenderPhoneNumber(phone);
  }, [searchParams]);

  return (
    <>
      <Textt variant="h4-craftwork">You’re senRemytel top-up to</Textt>

      <div className="mt-5">
        <TopupToDetailCard
          phone={searchParams.get("to") || ""}
          onPhoneEdit={handleEditPhone}
        />
      </div>

      <div className="mt-5">
        <TopupOptionDetailCard
          productOrPlan={
            searchParams.get("productId") || searchParams.get("planId") || ""
          }
          onProductOrPlanEdit={handleProductOrPlanEdit}
        />
      </div>

      {/* topups & plans */}
      <Card className="mt-5 py-[30px]">
        <form>
          <Textt variant="h4-craftwork">Sign Up To Continue</Textt>

          <Textt variant="span2-satoshi" className="mt-8 text-start">
            {`We'll text you a code to verify your number`}
          </Textt>

          <div className="my-[10px]">
            <PhoneInputLib
              defaultCountry="US"
              value={senderPhoneNumber}
              onChange={(val) => setSenderPhoneNumber(val)}
            />
          </div>
          {/* <PhoneInput className="my-[10px]" /> */}

          <Textt variant="span1-satoshi" className="mb-5 mt-[10px] text-start">
            {`I'd like to receive discounts, exclusive special offers and other updates from Topup.et via e-mail and SMS.`}
          </Textt>

          <div>
            {/* radio start */}
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="green"
              >
                <input
                  name="subscription"
                  type="radio"
                  className="before:content[''] before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#808080] text-green-500 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-[10px] checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                  id="green"
                />
                <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="6"></circle>
                  </svg>
                </span>
              </label>

              <Textt variant="span2-satoshi">Yes</Textt>
            </div>
            {/* radio end */}

            {/* radio start */}
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="green"
              >
                <input
                  name="subscription"
                  type="radio"
                  className="before:content[''] before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#808080] text-primary transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-[10px] checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                  id="green"
                />
                <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="6"></circle>
                  </svg>
                </span>
              </label>
              <Textt variant="span2-satoshi">No</Textt>
            </div>
            {/* radio end */}
          </div>

          <Button
            variant="primary-normal"
            className="my-4"
            onClick={handleSignup}
          >
            <Textt variant="h5-satoshi" className="text-white">
              Confirm Phone Number
            </Textt>
          </Button>
        </form>
      </Card>
    </>
  );
}

export default SignupSendTopup;
