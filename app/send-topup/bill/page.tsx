"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import MyButton from "@/components/ui/my-button";
import productContext from "@/states/product-context";
import sendTopupContext from "@/states/send-topup-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import withAuth from "@/components/protected-route";
import { processCheckout } from "@/services/checkout.service";
import { CheckoutPayload } from "@/models";
import userContext from "@/states/user-context";
import EditDetailMenu from "@/components/edit-detail-menu";

function Bill() {
  const {
    user: { user, token },
  } = useContext(userContext);
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const { product } = useContext(productContext);
  const [showPaymentDetail, setShowPaymentDetail] = useState(false);
  const router = useRouter();
  const [isEditDetailMenuOpen, setIdEditDetailMenuOpen] = useState(false);

  const handleProductEdit = () => {
    router.push(`/send-topup/options`);
  };

  const handleTogglePaymentDetail = () => {
    setShowPaymentDetail(!showPaymentDetail);
  };

  const toggleEditDetailMenu = () => {
    setIdEditDetailMenuOpen(!isEditDetailMenuOpen);
  };

  // const navigateToPaymentPage = () => router.push(`/send-topup/payment`);
  const handleCheckout = async () => {
    // make a request to /service/checkout
    let subFreq;
    if (sendTopup.topupFrequency === "7") {
      subFreq = "WEEKLY";
    } else if (sendTopup.topupFrequency === "14") {
      subFreq = "BIWEEKLY";
    } else if (sendTopup.topupFrequency === "30") {
      subFreq = "MONTHLY";
    }

    const payload: CheckoutPayload = {
      receiverPhoneNumber: sendTopup.to,
      receiverName: "",
      // receiverName: "Brook",
      productId: product.id,
      subscription: subFreq,
      successRoute: "/send-topup/success",
      failureRoute: "/send-topup/bill",
      // failureRoute: "/send-topup/failure",
    };

    // router.push("/send-topup/success");

    await processCheckout(payload, token)
      .then((res: any) => {
        if ((res.message = "Order Created")) {
          // make the transaction id available in the context
          setSendTopup({ ...sendTopup, transactionId: res.transaction_id });

          window.location = res.session.url;
          // window.location.href = res.session.url;
        } else {
          console.log("something went wrong on checkout!");
        }
      })
      .catch((err: any) => {
        console.log("something went wrong while processing checkout: ", err);
      });

    // if successful, navigate to /send-topup/success
  };

  return (
    <>
      <Textt variant="h4-craftwork">Your Order</Textt>

      <div className="relative mt-5">
        <TopupToDetailCard phone={sendTopup.to} />

        {/* show the edit detail menu */}
        {isEditDetailMenuOpen && <EditDetailMenu />}
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

          {sendTopup.topupFrequency && (
            <div className="">
              <Textt variant="span2-satoshi" className="block text-start">
                Auto top-up
              </Textt>
              <Textt variant="h3-satoshi" className="mt-2 block text-start">
                Every {sendTopup.topupFrequency} days
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
          onClick={handleCheckout}
        >
          <Textt variant="h5-satoshi" className="text-white">
            Continue Payment
          </Textt>
        </MyButton>
      </Card>
    </>
  );
}

export default withAuth(Bill);
