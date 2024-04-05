import Card from "@/components/card";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import React from "react";

function SendTopupLinkSMS() {
  return (
    <Card>
      <Textt variant="h4-satoshi" className="pt-[10px]">
        Who are you senRemytel it to?
      </Textt>
      <Textt
        variant="span2-satoshi"
        className="mt-8 text-start"
      >{`Enter your recipient Country and Phone number`}</Textt>
      <input
        type="text"
        placeholder="Name"
        id="cardNumber"
        className="mt-[10px] block h-[54px] w-full rounded-2xl border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
      />
      <input
        type="email"
        placeholder="Phone Number"
        id="cardNumber"
        className="mt-2 block h-[54px] w-full rounded-2xl border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
      />

      <MyButton variant="primary-normal" className="my-4 mt-8">
        <Textt variant="h5-satoshi" className="text-white">
          Send Link Via SMS
        </Textt>
      </MyButton>
    </Card>
  );
}

export default SendTopupLinkSMS;
