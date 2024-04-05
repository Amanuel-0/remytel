import React from "react";
import Image from "next/image";
import Card from "./card";
import Textt from "./text";
import MyButton from "./ui/my-button";

function SendYourFirstTopupBanner() {
  return (
    <Card className="flex flex-col items-center ">
      <Image
        src={"/assets/images/fly.jpeg"}
        alt={"fly.jpeg"}
        width={232}
        height={232}
        className="scale-x-[-1] transform"
      />

      <Textt variant="h4-craftwork">Recent Activities</Textt>
      <Textt
        variant="h2-craftwork"
        className="mt-7 font-extrabold text-[#1D3462]"
      >
        Send your first top-up to your loved ones
      </Textt>

      <Textt
        variant="span1-craftwork"
        className="mt-3 text-center font-medium text-[#1D3462]"
      >
        Once you send your first top up, your top up history will appear here.
      </Textt>

      <MyButton
        variant="primary-gradient-top-left"
        className="mt-7 max-w-[109px]"
      >
        <Textt variant="span1-satoshi" className="font-extrabold text-white">
          Send Now
        </Textt>
      </MyButton>
    </Card>
  );
}

export default SendYourFirstTopupBanner;
