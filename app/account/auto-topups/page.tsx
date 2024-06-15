"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/components/card";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import withAuth from "@/components/protected-route";
import AccountNav from "../account-nav";
import CancelAutoTopupModal from "@/components/cancel-auto-topup-modal";
import { SubscriptionT } from "@/services/type";
import userContext from "@/states/user-context";
import { getSubscriptionHistory } from "@/services/profile.service";
import { toast } from "sonner";

function AutoTopups() {
  const {
    user: { token },
  } = useContext(userContext);
  const [autoTopups, setAutoTopups] = useState<SubscriptionT[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const size = 10;
  useEffect(() => {
    async function getNextSubscriptionsPage() {
      try {
        const res = await getSubscriptionHistory(
          { page: currentPage, size },
          token,
        );
        if (res.items) {
          setAutoTopups((currentAutoTopups) => [
            ...currentAutoTopups,
            ...res.items,
          ]);
        }
        setHasNext(res?.metadata?.hasNext);
      } catch (e) {
        toast.error("Error happened while trying to fetch auto topups");
      }
    }
    if (token) {
      getNextSubscriptionsPage();
    }
  }, [currentPage, token]);
  const [openCancelAutoTopupModal, setOpenCancelAutoTopupModal] =
    React.useState(false);

  return (
    <div>
      {/* cancel autotopup modal   */}
      <CancelAutoTopupModal
        open={openCancelAutoTopupModal}
        onClose={() => setOpenCancelAutoTopupModal(false)}
      />

      {/*  */}
      <AccountNav />

      {/*  */}
      <section className="my-[10px]">
        <Card className="flex w-full flex-col justify-between gap-5 md:flex-row md:flex-wrap md:gap-5">
          {autoTopups.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-[20px] border p-5 xl:w-[49%]"
            >
              {/*  */}
              <div className={`flex items-center justify-start gap-5`}>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#80C03F] to-[#2CA342] text-white `}
                >
                  <Image
                    src={"/assets/icons/account-white.svg"}
                    alt={"account-white"}
                    width={12}
                    height={15}
                  />
                </div>

                <div>
                  <Textt variant="h6-satoshi" className="text-start">
                    {item.receiverName}
                  </Textt>
                  <Textt variant="span1-satoshi" className="mt-2 text-start">
                    {item.receiver}
                  </Textt>
                </div>
              </div>

              {/*  */}
              <div className="flex items-center justify-between border-b py-5">
                <div>
                  <Textt variant="span1-satoshi" className="block text-start">
                    Receives
                  </Textt>
                  <Textt variant="h6-satoshi" className="mt-2 block text-start">
                    {item.product?.price?.amount}{" "}
                    {item.product?.price?.currency}
                  </Textt>
                </div>

                <div className="">
                  <Textt variant="span1-satoshi" className="block text-start">
                    Auto top-up
                  </Textt>
                  <Textt
                    variant="h6-satoshi"
                    className="mt-2 block text-start text-primary"
                  >
                    Every{" "}
                    {item?.type === "MONTHLY"
                      ? "30"
                      : item?.type === "WEEKLY"
                        ? "7"
                        : item?.type === "BIWEEKLY"
                          ? "14"
                          : "-"}{" "}
                    days
                  </Textt>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 md:flex-row md:justify-between">
                <div className="flex items-center justify-start gap-2">
                  <Image
                    src={"/assets/icons/arrow-wraped-back-primary-arrow.svg"}
                    alt={"account-white"}
                    width={14}
                    height={12}
                  />
                  <Textt
                    variant="span1-satoshi"
                    className="whitespace-nowrap text-start"
                  >
                    {/* TODO */}
                    Next billing date 21 / 4 / 2024
                  </Textt>
                </div>

                <MyButton
                  type="button"
                  onClick={() => setOpenCancelAutoTopupModal(true)}
                  className="max-w-[164px] border border-[#C7C7C7]"
                >
                  <Textt variant="span1-satoshi">Cancel auto top-up</Textt>
                </MyButton>
              </div>
            </div>
          ))}
        </Card>
        {hasNext && (
          <div className="my-5 flex w-full justify-center">
            <MyButton
              variant="primary-normal"
              className="mx-auto w-max px-6"
              onClick={() => {
                setCurrentPage((p) => p + 1);
              }}
            >
              Load More
            </MyButton>
          </div>
        )}
      </section>
    </div>
  );
}

export default withAuth(AutoTopups);
