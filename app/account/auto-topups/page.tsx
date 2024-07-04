"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import Card from "@/components/card";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import withAuth from "@/components/protected-route";
import AccountNav from "../account-nav";
import CancelAutoTopupModal from "@/components/cancel-auto-topup-modal";
import { SubscriptionT } from "@/services/type";
import userContext from "@/states/user-context";
import {
  cancelSubscription,
  getSubscriptionHistory,
} from "@/services/profile.service";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/loading-spinner";
import InfiniteScroll from "react-infinite-scroll-component";

function AutoTopups() {
  const {
    user: { token },
  } = useContext(userContext);
  const [autoTopups, setAutoTopups] = useState<SubscriptionT[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const size = 24;
  useEffect(() => {
    async function getNextSubscriptionsPage() {
      setLoading(true);
      try {
        const res = await getSubscriptionHistory({ page: 0, size }, token);
        if (res.items) {
          setAutoTopups(res.items);
        }
        setHasNext(res?.metadata?.hasNext);
      } catch (e) {
        toast.error("Error happened while trying to fetch auto topups");
      } finally {
        setLoading(false);
      }
    }
    if (token) {
      getNextSubscriptionsPage();
    }
  }, []);

  const fetchMoreAutoTopup = async () => {
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
      setCurrentPage((prevPage) => prevPage + 1);
      setHasNext(res?.metadata?.hasNext);
    } catch (e) {
      toast.error("Error happened while trying to fetch auto topups");
    } finally {
      setLoading(false);
    }
  };
  const [openCancelAutoTopupModal, setOpenCancelAutoTopupModal] =
    React.useState<boolean>(false);
  const [selectedTopupId, setSelectedTopupId] = useState<string | null>(null);
  const handleCancelSubscription = useCallback(() => {
    if (!token || !selectedTopupId) return;
    cancelSubscription(token, selectedTopupId)
      .then((d) => {
        toast("The subscription was canceled successfully");
      })
      .catch(() => {
        toast.error(
          "An error happened while trying to cancel the subscription",
        );
      });
  }, [token, selectedTopupId]);
  return (
    <>
      <CancelAutoTopupModal
        open={openCancelAutoTopupModal}
        onClose={() => {
          setOpenCancelAutoTopupModal(false);
          setSelectedTopupId(null);
        }}
        handleConfirm={handleCancelSubscription}
      />
      <div>
        {/* cancel autotopup modal   */}

        {/*  */}
        <AccountNav />

        {/*  */}
        <section className="my-[10px]">
          <Card className="">
            <InfiniteScroll
              dataLength={autoTopups.length}
              next={fetchMoreAutoTopup}
              hasMore={hasNext}
              loader={<LoadingSpinner className="w-full" />}
              className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2"
            >
              {autoTopups.map((item, index) => (
                <AutoTopup
                  key={item.id}
                  item={item}
                  setOpenCancelAutoTopupModal={(open) => {
                    setOpenCancelAutoTopupModal(open);
                    setSelectedTopupId(item.id);
                  }}
                />
              ))}
            </InfiniteScroll>
          </Card>
        </section>
      </div>
    </>
  );
}
interface AutoTopupProps {
  item: SubscriptionT;
  setOpenCancelAutoTopupModal: (open: boolean) => void;
}
const AutoTopup = ({ item, setOpenCancelAutoTopupModal }: AutoTopupProps) => {
  return (
    <>
      <div className="w-full rounded-[20px] border p-5 ">
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
              {item.product?.price?.amount} {item.product?.price?.currency}
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
            className="max-w-[164px] border border-[#C7C7C7] transition-colors duration-300 hover:bg-red-800/15"
          >
            <Textt variant="span1-satoshi">Cancel auto top-up</Textt>
          </MyButton>
        </div>
      </div>
    </>
  );
};

export default withAuth(AutoTopups);
