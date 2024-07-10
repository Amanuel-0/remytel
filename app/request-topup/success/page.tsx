"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import React from "react";
import Image from "next/image";
import withAuth from "@/components/protected-route";
import { useRouter } from "next-nprogress-bar";

function Success() {
  const router = useRouter();

  const navigateToRequestTopup = () => {
    router.push("/request-topup/create-topup-link");
  };

  return (
    <>
      <Card className="flex flex-col items-center">
        <Image
          src={"/assets/images/success-check.svg"}
          alt={"success"}
          width={173}
          height={151}
        />

        <Textt variant="h4-craftwork" className="mt-8">
          Your Request was sent successfully
        </Textt>

        <MyButton
          variant="primary-normal"
          className="my-4 mt-8"
          onClick={navigateToRequestTopup}
        >
          <Textt variant="h5-satoshi" className="text-white">
            Send Another Request
          </Textt>
        </MyButton>
      </Card>
    </>
  );
}

export default withAuth(Success);
