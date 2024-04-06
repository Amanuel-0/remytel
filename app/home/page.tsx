"use client";
import Card from "@/components/card";
import Container from "@/components/container";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import React, { useCallback, useContext, useEffect } from "react";
import Image from "next/image";
import FaqAccordion from "@/components/faq-accordion";
import FooterAlt from "@/components/footer-alt";
import PhoneInputLib from "@/components/form/phone-input-lib";
import { useRouter, useSearchParams } from "next/navigation";
import sendTopupContext from "@/states/send-topup-context";

function LandingPage() {
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const [receiverPhoneNumber, setReceiverPhoneNumber] = React.useState("");
  const router = useRouter();

  useEffect(() => {
    const phone = sendTopup.to || "";
    setReceiverPhoneNumber(phone);
  }, [sendTopup.to]);

  const navigateToTopUpOptions = () => {
    setSendTopup({ ...sendTopup, to: receiverPhoneNumber });
    router.push("/send-topup/options");
  };

  return (
    <>
      <Container>
        <Navbar />
        <Hero />

        <section className="relative my-10 flex h-[264px] flex-col items-center sm:my-20">
          <Image
            src="/assets/images/ready-to-vector.svg"
            alt=""
            width={648}
            height={540}
            className="z-10 -mt-[136px] hidden sm:block"
          />

          <div className="absolute top-0 z-30 flex w-full flex-col items-center">
            <Card className="flex h-[210px] w-full flex-col justify-between px-4 py-2 sm:h-[225px] sm:w-[427px]">
              <Textt variant="h4-craftwork" className="mb-7 mt-3">
                Ready To Send a top-up?
              </Textt>

              <PhoneInputLib
                hideDropdown={true}
                disableCountryGuess={true}
                value={receiverPhoneNumber}
                onChange={(phoneNumber) => setReceiverPhoneNumber(phoneNumber)}
              />
              {/* <PhoneInput className="mb-3" /> */}
              {/* <Button variant="primary-normal">Start top-up</Button> */}
              <MyButton
                variant="primary-normal"
                onClick={navigateToTopUpOptions}
                className="mt-2"
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
                alt={"lighting-bolt-icon"}
                width={8}
                height={15}
              />
            </span>
          </div>
        </section>

        <section className="m-auto mb-10 w-full max-w-[835px] rounded-2xl bg-[#DDE1E9]">
          <div className="flex w-full flex-col items-center justify-center pt-10 xl:flex-row">
            {/* left/top */}
            <div className="sm:ml-20 sm:w-[363px]">
              <Textt variant="h3-craftwork" className="sm:text-start">
                Top-up wherever, whenever
              </Textt>
              <Textt variant="p1-satoshi" className="mt-2 w-72 sm:text-start">
                Get the Topup.et App for the fastest, easiest way to top-up any
                phone.
              </Textt>

              <div className="mt-5 flex flex-row items-center justify-center gap-7 sm:justify-start">
                <Image
                  src="/assets/images/play-store.svg"
                  alt=""
                  width={112}
                  height={25}
                />
                <Image
                  src="/assets/images/app-store.svg"
                  alt=""
                  width={101}
                  height={27}
                />
              </div>
            </div>

            {/* right/bottom */}
            <div className="mt-6">
              <Image
                src={"/assets/images/handl-holding-phone.png"}
                alt=""
                width={900}
                height={600}
                className="max-w-[320px] rounded-2xl sm:max-h-[305px] sm:w-[392px] sm:max-w-[392px]"
              />
            </div>
          </div>
        </section>

        <section className="m-auto mt-10 h-[200px] w-full sm:mt-16 sm:h-[308px]">
          <Textt variant="h3-craftwork" className="mt-14">
            Supported payment methods
          </Textt>

          <div className="mt-8 flex flex-row items-center justify-center gap-[68px] md:mt-16">
            <Image
              src="/assets/images/visa-logo.svg"
              alt=""
              width={63}
              height={20}
            />
            <Image
              src="/assets/images/master-card-logo.svg"
              alt=""
              width={44}
              height={34}
            />
            <Image
              src="/assets/images/paypal-logo.svg"
              alt=""
              width={27}
              height={30}
            />
          </div>
        </section>

        <section className="relative m-auto w-full max-w-[835px] rounded-2xl bg-[#E2E9DD]">
          <Image
            src="/assets/images/trusted-by-bg-vector.svg"
            alt="trusted-by-bg-vector"
            width={550}
            height={274}
            className="block h-[274px] w-full object-none object-center"
          />

          <div className="absolute left-0 top-1/3  m-auto w-full">
            <div className="flex w-full flex-col items-center justify-center gap-5">
              <Textt variant="h3-craftwork" className="max-w-[237px]">
                Trusted by 1M+ Ethiopians.
              </Textt>
              <Textt
                variant="p1-craftwork"
                className="max-w-[283px]"
              >{`Whether you call it top-up, mobile recharge, reload, airtime, load or credit, we've got you covered. We've delivered over 5 million international mobile recharges online.`}</Textt>
            </div>
          </div>
        </section>

        <section className="m-auto mt-10 w-full max-w-[835px] py-12 sm:mt-16">
          <div className="mb-10 flex w-full flex-col items-center">
            <Textt variant="h3-craftwork" className="w-full max-w-[458px]">
              Have a question about senRemytel mobile recharge with Topup.et?
            </Textt>
          </div>

          <FaqAccordion />
        </section>

        <section className="m-auto my-16 w-full max-w-[835px] rounded-2xl bg-[#DDE9DD] sm:mt-16 md:max-h-[225px]">
          <div className="flex flex-col gap-8 md:h-[225px] md:flex-row md:gap-14 md:px-[71px]">
            <div className="flex h-full flex-col items-center justify-center gap-7 pt-10 md:items-start md:pt-0">
              <Textt variant="h6-craftwork" className="whitespace-nowrap">
                Ready To Send a Top-up?
              </Textt>

              <div className="w-36">
                <MyButton variant="primary-gradient-bottom-right">
                  Start top-up
                </MyButton>
              </div>
            </div>

            <Image
              src={"/assets/images/man-holding-phone.png"}
              alt=""
              width={1080}
              height={1478}
              className="object-contain px-20"
            />
          </div>
        </section>
      </Container>

      <FooterAlt />
    </>
  );
}

export default LandingPage;
