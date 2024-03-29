"use client";
import Card from "@/components/card";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Textt from "@/components/text";
import VerifyOtp from "@/components/verify-otp";
import Container from "@/components/container";
import Image from "next/image";
import React from "react";

function OtpSignup() {
  return (
    <Container>
      <Navbar />

      <section className="my-10 flex min-h-[95%] flex-col gap-6 md:my-[60px] xl:flex-row xl:justify-between xl:gap-0">
        {/* hero left section */}
        <div className="xl:w-[50%]">
          <div className="relative overflow-hidden">
            <Image
              src="/assets/images/hero-background-vector.svg"
              alt="logo"
              width={269}
              height={443}
              className="absolute -left-24 top-0 z-20  max-h-[220px] w-[307px] rounded-2xl sm:block md:max-h-[300px] 2xl:max-h-[600px]"
            />

            <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-black opacity-80"></div>

            <Image
              src="/assets/images/women-holding-phone.jpeg"
              alt="logo"
              width={1280}
              height={853}
              className="rounded-2xl"
            />

            <div className="absolute bottom-0 z-20 m-auto w-full">
              <Textt
                variant="p1-satoshi"
                className="px-4 pb-16 text-white md:px-16 2xl:px-24"
              >
                {`By continuing, you agree to our Terms and Conditions and acknowledge our use of your information in accordance with our Privacy Notice.`}
              </Textt>
            </div>
          </div>
        </div>

        {/* form */}
        <div className="xl:w-[45%] xl:max-w-[670px]">
          <Textt variant="h3-craftwork" className="text-start sm:text-center">
            Sign up to continue
          </Textt>

          <Card className="my-8">
            {/* back button */}
            <button className="mb-6 flex h-8 items-center justify-start gap-2 rounded-full border-2 border-[#E1E1E1] px-5">
              <Image
                src="/assets/icons/arrow-back.svg"
                alt="arrow-left"
                width={5}
                height={6}
              />
              <Textt variant="span1-satoshi">Back</Textt>
            </button>

            <Textt variant="h4-craftwork" className="">
              {`Please Enter The Verification Code Sent to:`}
            </Textt>

            <Textt
              variant="span1-satoshi"
              className="mb-5 mt-[10px] text-primary"
            >
              +251 93 542 5899
            </Textt>

            {/* verify opt form */}
            <VerifyOtp />

            <Textt variant="span2-satoshi" className="">
              {`Request new code (00:30)`}
            </Textt>
          </Card>
        </div>
      </section>

      <Footer />
    </Container>
  );
}

export default OtpSignup;
