"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import React, { useContext } from "react";
import MyButton from "@/components/ui/my-button";
import { useRouter, useSearchParams } from "next/navigation";
import PhoneInputLib from "@/components/form/phone-input-lib";
import { isPhoneValid } from "@/utils";
import { login } from "@/services";
import productContext from "@/states/product-context";
import sendTopupContext from "@/states/send-topup-context";
import { ParsedCountry } from "react-international-phone";
// import {parsePhoneNumber} from 'google-libphonenumber'
import withOutAuth from "@/components/public-route";

function SignupSendTopup() {
  const searchParams = useSearchParams();
  const selectedOption = searchParams.get("selectedOption");
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const [senderPhoneNumber, setSenderPhoneNumber] = React.useState("");
  const [fromCountryCode, setFromCountryCode] = React.useState("US"); // ["US", "ET", ...]
  // const { createQueryString } = useCreateQueryString();
  const [subscription, setSubscription] = React.useState<"yes" | "no">("yes"); // ["yes", "no"]
  const [senderPhoneTouched, setSenderPhoneTouched] = React.useState(false);
  const router = useRouter();
  const { product } = useContext(productContext);

  const isSenderPhoneValid = isPhoneValid(senderPhoneNumber);

  const handleProductEdit = () => {
    router.push(`/send-topup/options`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isSenderPhoneValid) {
      setSenderPhoneTouched(true);
      return;
    }

    // login user
    const userData = await login({
      phoneNumber: senderPhoneNumber,
      code: fromCountryCode, // the country code of the sender phone number
    });
    console.log("login reponse data: ", userData);

    if (userData) {
      setSendTopup({ ...sendTopup, from: senderPhoneNumber, fromCountryCode });
      router.push(`/send-topup/verify?selectedOption=${selectedOption}`);
    }
  };

  return (
    <>
      <Textt variant="h4-craftwork">You’re senRemytel top-up to</Textt>

      <div className="mt-5">
        <TopupToDetailCard phone={sendTopup.to} />
      </div>

      <div className="mt-5">
        <TopupOptionDetailCard
          product={product}
          // searchParams.get("productId") || searchParams.get("planId") || ""
          onProductEdit={handleProductEdit}
        />
      </div>

      {/* topups & plans */}
      <Card className="mt-5 py-[30px]">
        <form onSubmit={(e: any) => handleSubmit(e)}>
          <Textt variant="h4-craftwork">Sign Up To Continue</Textt>

          <Textt variant="span2-satoshi" className="mt-8 text-start">
            {`We'll text you a code to verify your number`}
          </Textt>

          <div className="my-[10px]">
            <PhoneInputLib
              defaultCountry="US"
              name="phoneNumber"
              value={senderPhoneNumber}
              // setFromCountryCode(val)
              // onChange={(phone: string, { country, inputValue: string }) => {
              //   const phoneNumber = parsePhoneNumber(phone, country.iso2);
              //   if (phoneNumber) {
              //     setFromCountryCode(country.iso2);
              //     setSenderPhoneNumber(phoneNumber.formatInternational());
              //   }
              // }}

              onChange={(
                phone: string,
                meta: { country: ParsedCountry; inputValue: string },
              ) => {
                // console.log("phone", phone);
                // console.log("ParsedCountry", ParsedCountry);
                // console.log("inputValue", inputValue);
                // const phoneNumber = parsePhoneNumber(phone, meta.country.name);
                setFromCountryCode(meta.country.iso2);
                setSenderPhoneNumber(phone);
              }}
            />
            {senderPhoneTouched && !isSenderPhoneValid && (
              <small className="text-xs text-red-500">Phone is not valid</small>
            )}
            {/* <small className="text-xs text-red-500" key={errors?.phoneNumber}>
              {errors?.phoneNumber}
            </small> */}
          </div>
          {/* <PhoneInput className="my-[10px]" /> */}

          <Textt variant="span1-satoshi" className="mb-5 mt-[10px] text-start">
            {`I'd like to receive discounts, exclusive special offers and other updates from Topup.et via e-mail and SMS.`}
          </Textt>

          {/*  */}
          {subscription && (
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
                    checked={subscription === "yes"}
                    // onClick={(e) => setSubscription("yes")}
                    onChange={(e) => setSubscription("yes")}
                    // defaultChecked={true}
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
                    checked={subscription === "no"}
                    // onClick={(e) => setSubscription("no")}
                    onChange={(e) => setSubscription("no")}
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
          )}

          <MyButton
            type="submit"
            variant="primary-normal"
            className="my-4"
            disabled={!isSenderPhoneValid}
          >
            <Textt variant="h5-satoshi" className="text-white">
              Confirm Phone Number
            </Textt>
          </MyButton>
        </form>
      </Card>
    </>
  );
}

export default withOutAuth(SignupSendTopup);
