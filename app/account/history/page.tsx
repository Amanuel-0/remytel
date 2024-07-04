"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/components/card";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import withAuth from "@/components/protected-route";
import AccountNav from "../account-nav";
import { getOrderHistory } from "@/services/profile.service";
import userContext from "@/states/user-context";
import { Transaction } from "@/models";
import Link from "next/link";
import { buyProduct } from "@/services";
import { LoadingSpinner } from "@/components/loading-spinner";
import { toast } from "sonner";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import topupRequestContext from "@/states/request-topup-context";
import sendTopupContext from "@/states/send-topup-context";
import { useRouter } from "next/navigation";

function History() {
  const {
    user: { user, token },
  } = useContext(userContext);
  const [orders, setOrders] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const size = 10;
  useEffect(() => {
    async function getOrder() {
      setLoading(true);
      try {
        const res = await getOrderHistory({ page: 0, size }, token);
        if (res.items) {
          setOrders(res.items);
        }
        setHasNext(res?.metadata?.hasNext);
      } catch (e) {
        toast.error("Error happened while trying to fetch auto history");
      } finally {
        setLoading(false);
      }
    }
    if (token) {
      getOrder();
    }
  }, []);

  const getMoreOrders = async () => {
    try {
      const res = await getOrderHistory({ page: currentPage, size }, token);
      if (res.items) {
        setOrders((prevOrders) => [...prevOrders, ...res.items]);
      }
      setCurrentPage((prevPage) => prevPage + 1);
      setHasNext(res?.metadata?.hasNext);
    } catch (e) {
      toast.error("Error happened while trying to fetch history");
    } finally {
      setLoading(false);
    }
  };
  // handle resend topup
  const handleResendTopup = async (id: string) => {
    const selectedOrder = orders.find((item) => item.id === id);
    console.log("resend topup", selectedOrder);
    if (selectedOrder) {
      // todo: not implemented completely
      // buy product
      const response = await buyProduct(
        {
          senderFirstName: user.firstName,
          senderLastName: user.lastName,
          senderPhoneNumber: user.phoneNumber,
          senderEmail: user.email,
          productId: selectedOrder?.product.id,
          optinForMarketing: false,
        },
        token,
      );

      console.log("buy product response", response);
    }
  };
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const router = useRouter();
  const onResend = (order: Transaction) => {
    if (!order.subscription?.type) {
      setSendTopup({
        from: user.phoneNumber,
        product: order?.product,
        to: order?.receiver,
        topupFrequency: undefined,
        fromCountryCode: "US",
      });
      router.push(`/send-topup/bill`);
    } else {
      setSendTopup({
        from: user.phoneNumber,
        product: order?.product,
        to: order?.receiver,
        topupFrequency: order.subscription?.type,
        fromCountryCode: "US",
      });
      router.push(`/send-topup/options?selectedOption=${order.planId}`);
    }
  };
  const groupedItems = Object.groupBy(orders, ({ createdAt }) => {
    const isToday =
      moment().format("YYYY M D") === moment(createdAt).format("YYYY M D");
    return `${isToday ? "Today - " : ""}${moment(createdAt).format("dddd, MMMM Do YYYY")}`;
  });
  return (
    <div>
      <AccountNav />

      {/*  */}
      <section className="my-[10px]">
        <Card className="h-max overflow-auto">
          <InfiniteScroll
            dataLength={orders.length}
            next={getMoreOrders}
            hasMore={hasNext}
            loader={<LoadingSpinner className="w-full" />}
            className="grid w-full grid-cols-1 gap-5"
          >
            {Object.entries(groupedItems).map((value) => (
              <div key={value[0]} className="mb-6">
                <Textt variant="h5-craftwork" className="mb-5 mt-2 text-start ">
                  {value[0]}
                </Textt>
                <div className="pl-4">
                  {value[1]?.map?.((item) => (
                    <div
                      className={` flex w-full flex-col gap-5 border-b px-2  py-5 md:flex-row`}
                      key={item.id}
                    >
                      {/* cell 1 */}
                      <div className="flex w-full items-center">
                        <div
                          className={`flex items-center justify-start gap-[10px]`}
                        >
                          <div
                            className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gradient-to-br from-[#80C03F] to-[#2CA342] text-white `}
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
                              {item.receiverName ?? "No name"} received{" "}
                              {item.product.price.amount}{" "}
                              {item.product.price.currency}
                              {/* Brook received 138.00 ETB */}
                            </Textt>
                            <Textt
                              variant="span2-satoshi"
                              className="mt-2 text-start text-[16px]"
                            >
                              You paid {item.product.price.amount}{" "}
                              {item.product.price.currency}
                              {/* You paid 3.83 USD */}
                            </Textt>
                          </div>
                        </div>
                      </div>

                      {/* cell 2 */}
                      <div className="flex w-full items-center justify-start gap-2">
                        <Image
                          src={"/assets/icons/white-inblue-check.svg"}
                          alt={"account-white"}
                          width={19}
                          height={19}
                        />
                        <Textt variant="span1-satoshi" className="text-start">
                          Sent {new Date(item.createdAt).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(item.createdAt)
                            .toLocaleTimeString()
                            .split(":")
                            .slice(0, 2)
                            .join(":")}
                          {/* Sent 22/3/2024 at 15:07 */}
                        </Textt>
                      </div>

                      {/* cell 4 */}
                      <div className="flex items-center justify-start  gap-5">
                        <MyButton
                          type="button"
                          onClick={() => onResend(item)}
                          variant="primary-normal"
                          className="h-max max-w-[99px] md:min-w-[110px]"
                        >
                          <Textt
                            variant="span1-satoshi"
                            className=" text-white"
                          >
                            Resend
                          </Textt>
                        </MyButton>

                        <Link href={item.receiptUrl ?? "#"} target="_blank">
                          <Textt
                            variant="span1-satoshi"
                            className="max-w-[99px] text-primary md:min-w-[110px]"
                          >
                            View Receipt
                          </Textt>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </Card>
      </section>
    </div>
  );
}

export default withAuth(History);
