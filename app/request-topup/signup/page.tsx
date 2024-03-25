"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import Image from "next/image";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import React from "react";
import PhoneInput from "@/components/form/phone-input";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

function SignupSendTopup() {
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

          <PhoneInput className="my-[10px]" />

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
            By continuing, you agree to our Terms and Conditions and acknowledge
            our use of your information in accordance with our Privacy Notice.
          </Textt>
        </form>
      </Card>
    </>
  );
}

export default SignupSendTopup;
