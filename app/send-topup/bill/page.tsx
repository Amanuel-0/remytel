"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import MyButton from "@/components/ui/my-button";
import productContext from "@/states/product-context";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useContext, useState } from "react";

function Bill() {
  const { product } = useContext(productContext);
  const [showPaymentDetail, setShowPaymentDetail] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const senderPhone = searchParams.get("from") ?? "";
  const receiverPhone = searchParams.get("to") ?? "";
  const topupFrequency = searchParams.get("topup-frq") ?? "";

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name?: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name && value) params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleEditReceiverPhone = () => {
    router.push(`/?${createQueryString("to", receiverPhone || "")}`);
  };
  const handleProductEdit = () => {
    if (searchParams.get("productId")) {
      router.push(
        `/send-topup/options?${createQueryString("productId", searchParams.get("productId") || "")}`,
      );
    }
  };

  const handleTogglePaymentDetail = () => {
    setShowPaymentDetail(!showPaymentDetail);
  };

  const navigate = useRouter();

  const handleClick = () =>
    navigate.push(`/send-topup/payment?${createQueryString()}`);

  return (
    <>
      <Textt variant="h4-craftwork">Your Order</Textt>

      <div className="mt-5">
        <TopupToDetailCard
          phone={receiverPhone}
          onPhoneEdit={handleEditReceiverPhone}
        />
      </div>

      <div className="mt-5">
        <TopupOptionDetailCard
          product={product}
          onProductEdit={handleProductEdit}
        />
      </div>

      <Card className="my-8">
        <div className="flex items-center justify-between">
          <div>
            <Textt variant="span2-satoshi" className="block text-start">
              Receives
            </Textt>
            <Textt variant="h3-satoshi" className="mt-2 block text-start">
              {product.amount} ETB
            </Textt>
          </div>

          {topupFrequency && (
            <div className="">
              <Textt variant="span2-satoshi" className="block text-start">
                Auto top-up
              </Textt>
              <Textt variant="h3-satoshi" className="mt-2 block text-start">
                Every {topupFrequency} days
              </Textt>
            </div>
          )}
        </div>

        <button className="my-6 flex items-center justify-start gap-2">
          <Image
            src={"/assets/icons/gg_add.svg"}
            alt={"edit-icon"}
            width={24}
            height={24}
          />
          <Textt variant="span1-satoshi" className="text-primary">
            Add a Promo Code
          </Textt>
        </button>

        <hr />

        <div className="mt-6">
          <div>
            <button
              className="flex w-full justify-between"
              onClick={handleTogglePaymentDetail}
            >
              <Textt variant="h6-satoshi" className="text-start">
                Your Total
              </Textt>

              <div className="flex items-center justify-end gap-2">
                <Textt variant="span1-satoshi">
                  {product.price.amount} USD
                </Textt>

                <Image
                  src={
                    showPaymentDetail
                      ? "/assets/icons/up-icon.svg"
                      : "/assets/icons/down-icon.svg"
                  }
                  alt=""
                  width={12}
                  height={8}
                />
              </div>
            </button>

            <div className={`${showPaymentDetail ? "block" : "hidden"} mt-2`}>
              <div className="flex w-full justify-between">
                <Textt variant="h6-satoshi" className="text-start">
                  Top-up Subtotal
                </Textt>

                <Textt variant="span1-satoshi">
                  {product.price.amount} USD
                </Textt>
              </div>

              <div className="mt-2 flex w-full justify-between">
                <Textt variant="h6-satoshi" className="text-start">
                  Top-up Fee
                </Textt>

                <Textt variant="span1-satoshi">{product.price.fee} USD</Textt>
              </div>
            </div>
          </div>
        </div>

        <MyButton
          variant="primary-normal"
          className="mb-[10px] mt-10"
          onClick={handleClick}
        >
          <Textt variant="h5-satoshi" className="text-white">
            Continue Payment
          </Textt>
        </MyButton>
      </Card>
    </>
  );
}

export default Bill;
