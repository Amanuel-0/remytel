"use client";
import React from "react";
import Image from "next/image";
import Card from "@/components/card";
import Footer from "@/components/footer";
import PhoneInput from "@/components/form/phone-input";
import Navbar from "@/components/navbar";
import Textt from "@/components/text";
import Button from "@/components/ui/button";
import Container from "@/components/container";
import { useRouter } from "next/navigation";

function Login() {
  const navigate = useRouter();

  const handleClick = () => navigate.push("/verify-login");

  return (
    <Container>
      <Navbar />

      <section className="my-10 flex min-h-[95%] flex-col gap-6 md:my-[60px] xl:flex-row xl:justify-between xl:gap-0">
        {/* hero left section */}
        <div className="xl:w-[50%]">
          <div className="relative">
            <Image
              src="/assets/images/hero-background-vector.svg"
              alt="logo"
              width={269}
              height={443}
              className="absolute left-0 top-0 z-20  max-h-[250px] w-[307px] rounded-2xl sm:block md:max-h-[300px] 2xl:max-h-[600px]"
            />

            <Image
              src="/assets/images/women-holding-phone.jpeg"
              alt="logo"
              width={1280}
              height={853}
              className="rounded-2xl"
            />

            <div className="absolute bottom-0 m-auto w-full ">
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

              <PhoneInput className="my-[10px]" />
            </form>

            <Button
              variant="primary-normal"
              className="my-4"
              onClick={handleClick}
            >
              <Textt variant="h5-satoshi" className="text-white">
                Confirm Phone Number
              </Textt>
            </Button>

            <div className="flex w-full items-center justify-center gap-2">
              <Textt variant="span1-satoshi">Don’t have an account?</Textt>
              <Textt variant="span1-satoshi" className="text-primary">
                Sign Up Here
              </Textt>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </Container>
  );
}

export default Login;
