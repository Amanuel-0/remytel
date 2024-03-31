"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import React, { useEffect } from "react";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PhoneInputLib from "@/components/form/phone-input-lib";
import Link from "next/link";

function SignupSendTopup() {
  const [phone, setPhone] = React.useState("");

  useEffect(() => {
    console.log(phone);
  }, [phone]);
  const navigate = useRouter();

  const handleClick = () => navigate.push("/request-topup/verify");
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
              hideDropdown={true}
              disableCountryGuess={true}
              value={phone}
              onChange={(val) => setPhone(val)}
            />
          </div>

          {/* <PhoneInput className="my-[10px]" /> */}

          <Button
            variant="primary-normal"
            className="my-4"
            onClick={handleClick}
          >
            <Textt variant="h5-satoshi" className="text-white">
              Confirm Phone Number
            </Textt>
          </Button>

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
