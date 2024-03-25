import Card from "@/components/card";
import Textt from "@/components/text";
import Button from "@/components/ui/button";
import React from "react";
import Image from "next/image";

function Success() {
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

        <Button variant="primary-normal" className="my-4 mt-8">
          <Textt variant="h5-satoshi" className="text-white">
            Send Another Request
          </Textt>
        </Button>
      </Card>
    </>
  );
}

export default Success;
