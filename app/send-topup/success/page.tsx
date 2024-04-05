"use client";
import Card from "@/components/card";
import React, { useContext } from "react";
import Image from "next/image";
import Textt from "@/components/text";
import Button from "@/components/ui/my-button";
import { useRouter, useSearchParams } from "next/navigation";
import productContext from "@/states/product-context";
import { Product } from "@/services";
import SaveContactModal from "@/components/save-contact-modal";

function Success() {
  const { product, onProductChange } = useContext(productContext);
  const [openSaveContactModal, setOpenSaveContactModal] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const senderPhone = searchParams.get("from") ?? "";
  const receiverPhone = searchParams.get("to") ?? "";
  const topupFrequency = searchParams.get("topup-frq") ?? "";

  const handleSendAnotherTopup = () => {
    // onProductChange({} as Product);
    router.push("/send-topup/options");
  };
  const handleDone = () => {
    // onProductChange({} as Product);
    // router.push("/send-topup");
    console.log("Done");
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

        <Textt variant="h1-craftwork" className="mt-6">
          Top-up Completed
        </Textt>
        <Textt variant="span2-satoshi" className="mt-2">
          22 Mar 2024, 03:07 PM
        </Textt>

        {topupFrequency && (
          <div className="mt-2 flex items-center justify-start gap-2">
            <Image
              src={"/assets/icons/schedule-icon.svg"}
              alt={"success"}
              width={16}
              height={17}
            />

            <Textt variant="span1-satoshi">
              Auto top-up every {topupFrequency} days 
            </Textt>
          </div>
        )}

        <button className="mt-2 flex h-[34px] w-[120px] items-center justify-center gap-[10px] rounded-full border border-[#DDD]">
          <Textt variant="span2-satoshi">View receipt</Textt>
          <Image
            src={"/assets/icons/arrow-right.svg"}
            alt={"right"}
            width={5}
            height={9}
          />
        </button>
      </Card>

      <Card className="mt-5">
        <div className="flex items-center justify-between">
          <Textt variant="h4-satoshi" className="text-start">
            {receiverPhone}
          </Textt>

          <button
            className="flex h-[34px] w-[120px] items-center justify-center gap-[10px] rounded-full border border-[#DDD]"
            onClick={() => setOpenSaveContactModal(true)}
          >
            <Textt variant="span2-satoshi">Save contact</Textt>
            <Image
              src={"/assets/icons/arrow-right.svg"}
              alt={"right"}
              width={5}
              height={9}
            />
          </button>
        </div>

        <div className="mt-2 flex gap-2">
          <Textt variant="p1-satoshi" className="text-start">
            Received your top-up of
          </Textt>
          <Textt variant="h6-satoshi">{product.amount} ETB</Textt>
        </div>

        <div className="mb-6 mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            <Textt variant="p1-satoshi" className="text-start">
              Transaction ID
            </Textt>
            <Textt variant="p1-satoshi" className="text-primary">
              10052435
            </Textt>
          </div>

          <div className="flex gap-2">
            <Textt variant="p1-satoshi" className="text-start">
              Sent in 5 seconds
            </Textt>
            <Image
              src={"/assets/icons/lighting-bolt-icon.svg"}
              alt={"right"}
              width={8}
              height={15}
            />
          </div>
        </div>

        <hr />

        {/* // */}
        <div className="my-7">
          <div className="flex items-center justify-between">
            <Textt variant="h6-satoshi" className="text-start">
              Scheduled top-up set
            </Textt>

            <button className="flex h-[34px] w-[120px] items-center justify-center gap-[10px] rounded-full border border-[#DDD]">
              <Textt variant="span2-satoshi">See more</Textt>
              <Image
                src={"/assets/icons/arrow-right.svg"}
                alt={"right"}
                width={5}
                height={9}
              />
            </button>
          </div>

          <Textt variant="p1-satoshi" className="mt-2 text-start">
            Next payment on 21 Apr 2024
          </Textt>
        </div>

        <Button variant="primary-normal" onClick={handleSendAnotherTopup}>
          <Textt variant="h5-satoshi" className="text-white">
            Send another top-up
          </Textt>
        </Button>

        <Button variant="light-normal" className="mt-3">
          <Textt variant="h5-satoshi" className="text-[#6D6D6D]">
            Done
          </Textt>
        </Button>
      </Card>

      {/* save contact modal */}
      <SaveContactModal
        open={openSaveContactModal}
        onClose={() => setOpenSaveContactModal(false)}
      />
    </>
  );
}

export default Success;
