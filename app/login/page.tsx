"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Card from "@/components/card";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import Container from "@/components/container";
import { useRouter } from "next/navigation";
import PhoneInputLib from "@/components/form/phone-input-lib";
import Link from "next/link";
import useCreateQueryString from "@/hooks/use-create-query-params";
import { login } from "@/services";
import { isPhoneValid } from "@/utils";
import withOutAuth from "@/components/public-route";

function Login() {
  const [phone, setPhone] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("US"); // ["US", "ET", ...]
  const [senderPhoneTouched, setSenderPhoneTouched] = React.useState(false);
  const router = useRouter();
  const { createQueryString } = useCreateQueryString();

  const isSenderPhoneValid = isPhoneValid(phone);

  useEffect(() => {
    console.log(phone);
  }, [phone]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isSenderPhoneValid) {
      setSenderPhoneTouched(true);
      return;
    }

    // login user
    const userData = await login({
      phoneNumber: phone,
      code: countryCode, // the country code of the sender phone number
    });
    console.log("signup data: ", userData);

    if (userData) {
      router.push(
        `/verify-signup?${createQueryString([
          { name: "phone", value: phone },
          { name: "code", value: countryCode },
        ])}`,
      );
    }
  };

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
            Welcome Back
          </Textt>

          <Card className="my-8">
            <form>
              <Textt variant="h4-craftwork" className="block md:hidden">
                {`What’s your number?`}
              </Textt>

              <Textt variant="span2-satoshi" className="mt-8 text-start">
                {`We'll text you a code to verify your number`}
              </Textt>

              <div className="my-[10px]">
                <PhoneInputLib
                  defaultCountry="US"
                  name="phone"
                  value={phone}
                  onChange={(
                    phone: string,
                    { country: ParsedCountry, inputValue: string },
                  ) => {
                    setCountryCode(ParsedCountry.iso2);
                    setPhone(phone);
                  }}
                />
                {senderPhoneTouched && !isSenderPhoneValid && (
                  <small className="text-xs text-red-500">
                    Phone is not valid
                  </small>
                )}
              </div>
            </form>

            <MyButton
              variant="primary-normal"
              className="my-4"
              onClick={handleSubmit}
            >
              <Textt variant="h5-satoshi" className="text-white">
                Confirm Phone Number
              </Textt>
            </MyButton>

            <div className="flex w-full items-center justify-center gap-2">
              <Textt variant="span1-satoshi">Don’t have an account?</Textt>
              <Link href={"/signup"}>
                <Textt variant="span1-satoshi" className="text-primary">
                  Sign Up Here
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

export default withOutAuth(Login);
