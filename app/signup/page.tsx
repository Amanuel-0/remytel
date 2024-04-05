"use client";
import Footer from "@/components/footer";
import Container from "@/components/container";
import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Textt from "@/components/text";
import Card from "@/components/card";
import MyButton from "@/components/ui/my-button";
import { useRouter } from "next/navigation";
import PhoneInputLib from "@/components/form/phone-input-lib";
import Link from "next/link";

function Signup() {
  const [phone, setPhone] = React.useState("");

  useEffect(() => {
    console.log(phone);
  }, [phone]);

  const navigate = useRouter();

  const handleClick = () => navigate.push("/verify-login");

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
            <form>
              <Textt variant="h4-craftwork" className="block md:hidden">
                Sign Up To Continue
              </Textt>

              <Textt variant="span2-satoshi" className="mt-8 text-start">
                {`We'll text you a code to verify your number`}
              </Textt>

              <div className="my-[10px]">
                <PhoneInputLib
                  value={phone}
                  onChange={(val) => setPhone(val)}
                />
              </div>

              {/* <PhoneInput className="my-[10px]" /> */}
            </form>

            <Textt
              variant="span1-satoshi"
              className="mb-5 mt-[10px] text-start"
            >{`I'd like to receive discounts, exclusive special offers and other updates from Topup.et via e-mail and SMS.`}</Textt>

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

            <MyButton
              variant="primary-normal"
              className="my-4"
              onClick={handleClick}
            >
              <Textt variant="h5-satoshi" className="text-white">
                Confirm Phone Number
              </Textt>
            </MyButton>

            <div className="flex w-full items-center justify-center gap-2">
              <Textt variant="span1-satoshi">Already have an account?</Textt>
              <Link href={"/login"}>
                <Textt variant="span1-satoshi" className="text-primary">
                  Log in
                </Textt>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </Container>
  );
}

export default Signup;
