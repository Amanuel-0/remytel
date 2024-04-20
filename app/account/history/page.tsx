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
import {
  IPageMetadata,
  IPageResponse,
  Transaction,
  defaultPageMetadata,
} from "@/models";
import Link from "next/link";
import { buyProduct } from "@/services";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LoadingSpinner } from "@/components/loading-spinner";

function History() {
  const {
    user: { user, token },
  } = useContext(userContext);
  const [orderHistory, setOrderHistory] = useState<IPageResponse<Transaction>>({
    items: [],
    metadata: defaultPageMetadata,
  });
  const [loading, setLoading] = useState(true);
  const fetchOrderHistory = async (
    metadata: IPageMetadata = defaultPageMetadata,
  ) => {
    const response = await getOrderHistory(metadata, token);
    setOrderHistory(response);
    console.log(response);
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    if (orderHistory.items.length > 0) {
      setLoading(false);
    }
  }, [orderHistory.items]);

  useEffect(() => {
    console.log("page", orderHistory.metadata.page);
    fetchOrderHistory(orderHistory.metadata);
  }, [orderHistory.metadata.page]);

  const handlePagination = (page: number) => {
    setOrderHistory((prevVal) => ({
      items: prevVal.items,
      metadata: {
        ...prevVal.metadata,
        page,
      },
    }));
  };
  const handlePaginationNext = () => {
    setOrderHistory((prevVal) => ({
      items: prevVal.items,
      metadata: {
        ...prevVal.metadata,
        page: prevVal.metadata.page + 1,
      },
    }));
  };
  const handlePaginationPrev = () => {
    setOrderHistory((prevVal) => ({
      items: prevVal.items,
      metadata: {
        ...prevVal.metadata,
        page: prevVal.metadata.page - 1,
      },
    }));
  };

  // handle resend topup
  const handleResendTopup = async (id: string) => {
    const selectedOrder = orderHistory.items.find((item) => item.id === id);
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

  return (
    <div>
      <AccountNav />

      {/*  */}
      <section className="my-[10px]">
        <Card className="w-full">
          <Textt variant="h4-craftwork" className="mt-2 text-start ">
            Today
          </Textt>

          {/* table */}
          <div className="mt-5">
            {loading && <LoadingSpinner />}

            {orderHistory &&
              orderHistory.items.map((item, index) => (
                <>
                  {/* row */}
                  <div
                    className={`flex w-full flex-col gap-5 py-5 md:flex-row ${index !== 2 ? "border-b" : ""}`}
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
                            {item.product.amount} ETB
                            {/* Brook received 138.00 ETB */}
                          </Textt>
                          <Textt
                            variant="span2-satoshi"
                            className="mt-2 text-start"
                          >
                            You paid {item.product.price.amount} USD
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
                        Sent {new Date(item.createdAt).toLocaleDateString()} at{" "}
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
                        onClick={() => handleResendTopup(item.id)}
                        variant="primary-normal"
                        className="max-w-[99px] md:min-w-[110px]"
                      >
                        <Textt variant="span1-satoshi" className="text-white">
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
                </>
              ))}
          </div>
          {/* pagination */}
          <Pagination className="flex justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (orderHistory.metadata.hasPrev) {
                      handlePaginationPrev();
                    }
                    return;
                  }}
                  className={`${orderHistory.metadata.hasPrev ? "cursor-pointer" : "cursor-not-allowed"}  hover:bg-transparent`}
                />
              </PaginationItem>
              {orderHistory.metadata.page + 1 > 0 && (
                <PaginationItem>
                  <PaginationLink
                    // onClick={() =>
                    //   handlePagination(orderHistory.metadata.page + 1)
                    // }
                    className="cursor-pointer hover:bg-transparent"
                  >
                    {orderHistory.metadata.page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {/* <PaginationItem>
                <PaginationLink
                  onClick={() => handlePagination(orderHistory.metadata.page)}
                  className="cursor-pointer hover:bg-transparent"
                >
                  {orderHistory.metadata.page}
                </PaginationLink>
              </PaginationItem> */}
              {/* {orderHistory.metadata.page <
                orderHistory.metadata.total / orderHistory.metadata.size && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() =>
                      handlePagination(orderHistory.metadata.page + 1)
                    }
                    className="cursor-pointer hover:bg-transparent"
                  >
                    {orderHistory.metadata.page + 1}
                  </PaginationLink>
                </PaginationItem>
              )} */}
              {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (orderHistory.metadata.hasNext) {
                      handlePaginationNext();
                    }
                    return;
                  }}
                  className={`${orderHistory.metadata.hasNext ? "cursor-pointer" : "cursor-not-allowed"}  hover:bg-transparent`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div>
            {/* feb */}
            <Textt variant="h4-craftwork" className="mt-8 text-start ">
              Feb 27
            </Textt>
            {/* row */}
            <div className={`flex w-full flex-col gap-5 py-5 md:flex-row`}>
              {/* cell 1 */}
              <div className="flex w-full items-center">
                <div className={`flex items-center justify-start gap-[10px]`}>
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
                      Brook received 138.00 ETB
                    </Textt>
                    <Textt variant="span2-satoshi" className="mt-2 text-start">
                      You paid 3.83 USD
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
                  Sent 22/3/2024 at 15:07
                </Textt>
              </div>

              {/* cell 4 */}
              <div className="flex justify-start gap-5">
                <MyButton
                  variant="primary-normal"
                  className="max-w-[99px] md:min-w-[110px]"
                >
                  <Textt variant="span1-satoshi" className="text-white">
                    Resend
                  </Textt>
                </MyButton>

                <button>
                  <Textt
                    variant="span1-satoshi"
                    className="max-w-[99px] text-primary md:min-w-[110px]"
                  >
                    View Receipt
                  </Textt>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default withAuth(History);
