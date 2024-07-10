"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Textt from "./text";
import MyButton from "./ui/my-button";
import Image from "next/image";
import ModalWrapper from "./modal-wrapper";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import withAuth from "./protected-route";
import productContext from "@/states/product-context";
import sendTopupContext from "@/states/send-topup-context";
import Card from "./card";
import TopupOptions from "./topups-options";
import { getOrderHistory } from "@/services/profile.service";
import userContext from "@/states/user-context";
import { SubscriptionTypeMap } from "@/services/type";

/**
 * a modal to set auto topup
 */
function SetAutoTopupModal({
  open,
  onClose,
  handleCloseAllModal,
}: {
  open: boolean;
  onClose: () => void;
  handleCloseAllModal?: () => void;
}) {
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const [selectedFrequency, setSelectedFrequency] = React.useState<
    "7" | "14" | "30" | undefined
  >(sendTopup.topupFrequency as any); // ["7", "14", "30"]
  const { product } = useContext(productContext);
  const router = useRouter();

  const frequencyOptions = ["7", "14", "30"];

  useEffect(() => {
    setSendTopup({ ...sendTopup, topupFrequency: selectedFrequency });
  }, [selectedFrequency]);

  const handleSelectedFrequency = (option: string) => {
    setSelectedFrequency(option as any);
    setSendTopup({ ...sendTopup, topupFrequency: option });
  };

  const handleSendAutoTopup = () => {
    if (window.location.pathname === "/send-topup/bill") {
      handleCloseAllModal && handleCloseAllModal();
    } else {
      router.push(`/send-topup/bill`);
    }
  };
  const handleNoThanks = () => {
    setSendTopup({ ...sendTopup, topupFrequency: undefined });
    if (window.location.pathname === "/send-topup/bill") {
      handleCloseAllModal && handleCloseAllModal();
    } else {
      router.push(`/send-topup/bill`);
    }
  };

  //mark previously sent frequences unavaliable
  const {
    user: { token },
  } = useContext(userContext);
  const [unavaliableProducts, setUnavaliableProducts] = useState<string[]>([]);
  useEffect(() => {
    if (sendTopup?.to) {
      getOrderHistory({ page: 0, size: 10 }, token, sendTopup.to).then((d) => {
        setUnavaliableProducts(
          d.items?.map(
            (i) => SubscriptionTypeMap[i?.subscription?.type || "BIWEEKLY"],
          ),
        );
      });
    }
  }, [sendTopup]);

  return (
    <ModalWrapper open={open} onClose={onClose}>
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
        >{`We'll automatically resend ${product.amount} ETB to ${sendTopup.to} so that you don't have to.`}</Textt>

        <Textt
          variant="h5-craftwork"
          className="mt-6 text-start font-semibold md:text-center"
        >
          Choose the Frequency:
        </Textt>

        <div className="mt-6">
          {frequencyOptions.map((option) => {
            if (option === selectedFrequency) {
              return (
                <MyButton
                  key={option}
                  variant="primary-normal"
                  className="mt-[10px]"
                  onClick={() => handleSelectedFrequency(option)}
                  disabled={unavaliableProducts.includes(option)}
                >
                  <Textt variant="h6-satoshi" className="text-white">
                    {option} Days
                  </Textt>
                </MyButton>
              );
            }

            return (
              <MyButton
                key={option}
                className={`mt-[10px] border border-black bg-white text-black transition-colors duration-300 hover:bg-primary/5`}
                onClick={() => handleSelectedFrequency(option)}
                disabled={unavaliableProducts.includes(option)}
              >
                <Textt variant="h6-satoshi">{option} Days</Textt>
              </MyButton>
            );
          })}

          <Textt variant="span1-satoshi" className="mt-6">
            Renews automatically. No extra costs. cancel anytime.
          </Textt>
        </div>

        <div className="mt-10">
          <MyButton
            className="border border-gray-300 bg-white text-black transition-colors duration-300 hover:bg-black/5"
            onClick={handleNoThanks}
          >
            <Textt variant="span2-satoshi">No Thanks</Textt>
          </MyButton>
          <MyButton
            variant="primary-normal"
            className="mt-[10px]"
            onClick={handleSendAutoTopup}
          >
            <Textt variant="span2-satoshi" className="text-white">
              Send Auto top-up
            </Textt>
          </MyButton>
        </div>
      </Card>
    </ModalWrapper>
  );
}

export default SetAutoTopupModal;
// export default withAuth(SetAutoTopupModal);
