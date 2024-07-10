"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Card from "@/components/card";
import PhoneInputLib from "@/components/form/phone-input-lib";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import { useRouter } from "next/navigation";
import sendTopupContext from "@/states/send-topup-context";
import userContext from "@/states/user-context";

function To() {
  const {
    user: { user, token },
  } = useContext(userContext);
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const [toPhone, setToPhone] = React.useState("");
  const [isValidPhone, setIsValidPhone] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    validatePhoneNumber();
  }, [toPhone]);

  const handlePhoneNumberChange = (phone: any) => {
    setToPhone(phone);
    // validatePhoneNumber();
  };

  const validatePhoneNumber = () => {
    // Regular expression for Ethiopian phone numbers
    const ethiopianPhoneNumberRegex = /^(\+251)?[1-59]\d{8}$/;
    setIsValidPhone(ethiopianPhoneNumberRegex.test(toPhone));
  };

  const navigateToTopUpOptions = (newUser?: boolean) => {
    setSendTopup({ ...sendTopup, to: toPhone });
    router.push(`/send-topup/options${newUser ? "?newUser=true" : ""}`);
  };
  const navigateToCompletePofile = () => {
    setSendTopup({ ...sendTopup, to: toPhone });
    router.push(`/send-topup/complete-profile`);
  };
  const handleStartTopUp = () => {
    //if user exists and did complete his profile
    if (user?.firstName) {
      navigateToTopUpOptions();
    }
    //if user is not logged in
    else if (!token) {
      navigateToTopUpOptions(true);
    } else {
      navigateToCompletePofile();
    }
  };

  return (
    <section className="relative my-10 flex h-[264px] flex-col items-center sm:my-20">
      <>
        <Card className="flex h-[210px] w-full flex-col justify-between px-4 py-2 sm:h-[225px] sm:w-[427px]">
          <Textt variant="h4-craftwork" className="mb-7 mt-3">
            Ready To Send a top-up?
          </Textt>

          <PhoneInputLib
            hideDropdown={true}
            disableCountryGuess={true}
            value={toPhone}
            onChange={(phoneNumber) => handlePhoneNumberChange(phoneNumber)}
          />
          {/* <PhoneInput className="mb-3" /> */}
          {/* <Button variant="primary-normal">Start top-up</Button> */}
          <MyButton
            variant="primary-normal"
            onClick={handleStartTopUp}
            className="mt-4"
            disabled={!isValidPhone}
            key={toPhone}
          >
            <Textt variant="h6-satoshi" className="text-white">
              Start top-up
            </Textt>
          </MyButton>
        </Card>

        <span className="my-5 flex h-[36px] w-[163px] flex-row items-center justify-center gap-[10px] rounded-full border border-[#E1E1E1] bg-white text-sm leading-[18.4px]">
          <span>With in 5 seconds</span>
          <Image
            src={"/assets/icons/lighting-bolt-icon.svg"}
            alt={""}
            width={8}
            height={14}
          />
        </span>
      </>
    </section>
  );
}

export default To;
