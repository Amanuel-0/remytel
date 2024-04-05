"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import React, { useCallback, useContext, useEffect } from "react";
import MyButton from "@/components/ui/my-button";
import { useRouter, useSearchParams } from "next/navigation";
import PhoneInputLib from "@/components/form/phone-input-lib";
import Link from "next/link";
import authContext from "@/states/auth-context";
import { isPhoneValid } from "@/utils";
import { login } from "@/services";

function SignupSendTopup() {
  const [senderPhoneNumber, setSenderPhoneNumber] = React.useState("");
  const [senderPhoneTouched, setSenderPhoneTouched] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isLoggedIn } = useContext(authContext);

  // do not show this page if the user is logged in and return to
  // the previous page or somewhere else
  // if (isLoggedIn) {
  //   router.back();
  // }

  const isSenderPhoneValid = isPhoneValid(senderPhoneNumber);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    console.log(senderPhoneNumber);
  }, [senderPhoneNumber]);
  const navigate = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isSenderPhoneValid) {
      setSenderPhoneTouched(true);
      return;
    }

    // for now, just redirect to signup page
    router.push(
      `/request-topup/verify?${createQueryString("from", senderPhoneNumber)}`,
    );
    return;

    // login user
    const userData = await login({
      phoneNumber: senderPhoneNumber,
    });
    // todo: save user data in react context & local storage

    console.log("login reponse data: ", userData);
    if (userData) {
      router.push(
        `/request-topup/signup?${createQueryString("from", senderPhoneNumber)}`,
      );
    }
  };

  return (
    <>
      <Textt variant="h4-craftwork" className="text-start">
        Enter Your Phone Number To Continue.
      </Textt>

      {/* topups & plans */}
      <Card className="mt-5 py-[30px]">
        <form>
          <Textt variant="h4-craftwork">Sign Up</Textt>

          <Textt variant="span2-satoshi" className="mt-8 text-start">
            {`We'll text you a code to verify your number`}
          </Textt>

          <div className="my-[10px]">
            <PhoneInputLib
              name="phoneNumber"
              hideDropdown={true}
              disableCountryGuess={true}
              value={senderPhoneNumber}
              onChange={(val) => {
                if (isSenderPhoneValid) {
                }
                setSenderPhoneNumber(val);
              }}
            />

            {senderPhoneTouched && !isSenderPhoneValid && (
              <small className="text-xs text-red-500">Phone is not valid</small>
            )}
          </div>

          {/* <PhoneInput className="my-[10px]" /> */}

          <MyButton
            variant="primary-normal"
            className="my-4"
            onClick={handleSubmit}
          >
            <Textt variant="h5-satoshi" className="text-white">
              Confirm Phone Number
            </Textt>
          </MyButton>

          <Textt variant="p1-satoshi" className="mb-5 mt-[10px]">
            By continuing, you agree to our 
            <Link href={"/terms-conditions"}>
              <Textt
                variant="span1-satoshi"
                className="inline-block text-primary"
              >
                Terms and Conditions
              </Textt>
            </Link>
             and acknowledge our use of your information in accordance with our 
            <Link href={"/terms-conditions"}>
              <Textt
                variant="span1-satoshi"
                className="inline-block text-primary"
              >
                Privacy Notice.
              </Textt>
            </Link>
          </Textt>
        </form>
      </Card>
    </>
  );
}

export default SignupSendTopup;
