import React from "react";
import Card from "./card";
import PhoneInputLib from "./form/phone-input-lib";
import Textt from "./text";
import Button from "./ui/button";
import Image from "next/image";

function ReadyToSendTopup() {
  return (
    <>
      <Card className="flex h-[210px] w-full flex-col justify-between px-4 py-2 sm:h-[225px] sm:w-[427px]">
        <Textt variant="h4-craftwork" className="mb-7 mt-3">
          Ready To Send a top-up?
        </Textt>

        <PhoneInputLib
          hideDropdown={true}
          disableCountryGuess={true}
          value={receiverPhoneNumber}
          onChange={(val) => setReceiverPhoneNumber(val)}
        />
        {/* <PhoneInput className="mb-3" /> */}
        {/* <Button variant="primary-normal">Start top-up</Button> */}
        <Button variant="primary-normal" onClick={handleStarttopup}>
          <Textt variant="h6-satoshi" className="text-white">
            Start top-up
          </Textt>
        </Button>
      </Card>

      <span className="my-5 flex h-[36px] w-[163px] flex-row items-center justify-center gap-[10px] rounded-full border border-[#E1E1E1] bg-white text-sm leading-[18.4px]">
        <span>With in 5 seconds</span>
        <Image
          src={"/assets/icons/lighting-bolt-icon.svg"}
          alt={""}
          width={8}
          height={14}
        />
      </span>
    </>
  );
}

export default ReadyToSendTopup;
