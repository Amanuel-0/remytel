import Card from "@/components/card";
import Textt from "@/components/text";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

function AutoTopup() {
  return (
    <>
      <Card className="my-8">
        <div className="flex w-full justify-center">
          <div className="w-fit rounded-full bg-gradient-to-br from-[#80C03F] to-primary p-6">
            <Image
              src={"/assets/icons/schedule-icon-white.svg"}
              alt={"schedule"}
              width={33}
              height={34}
              className="h-6 w-6"
            />
          </div>
        </div>

        <Textt
          variant="h5-craftwork"
          className="mt-6 text-start md:text-center"
        >
          Set Auto top-up
        </Textt>
        <Textt
          variant="p2-satoshi"
          className="mt-4 text-start md:text-center"
        >{`We'll automatically resend 138 ETB to +251984841930 so that you don't have to.`}</Textt>

        <Textt
          variant="h5-craftwork"
          className="mt-6 text-start font-semibold md:text-center"
        >
          Choose the Frequency:
        </Textt>

        <div className="mt-6">
          <Button className="border border-black bg-white text-black">
            <Textt variant="h6-satoshi">7 Days</Textt>
          </Button>
          <Button className="mt-[10px] border border-black bg-white text-black">
            <Textt variant="h6-satoshi">14 Days</Textt>
          </Button>
          <Button variant="primary-normal" className="mt-[10px]">
            <Textt variant="h6-satoshi" className="text-white">
              30 Days
            </Textt>
          </Button>

          <Textt variant="span1-satoshi" className="mt-6">
            Renews automatically. No extra costs. cancel anytime.
          </Textt>
        </div>

        <div className="mt-10">
          <Button className="border border-gray-300 bg-white text-black">
            <Textt variant="span2-satoshi">No Thanks</Textt>
          </Button>
          <Button variant="primary-normal" className="mt-[10px]">
            <Textt variant="span2-satoshi" className="text-white">
              Send Auto top-up
            </Textt>
          </Button>
        </div>
      </Card>
    </>
  );
}

export default AutoTopup;
