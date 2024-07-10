"use client";
import Card from "@/components/card";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import { useRouter, useSearchParams } from "next/navigation";
import productContext from "@/states/product-context";
import SaveContactModal from "@/components/save-contact-modal";
import withAuth from "@/components/protected-route";
import {
  IPageMetadata,
  Product,
  Transaction,
  defaultPageMetadata,
} from "@/models";
import sendTopupContext from "@/states/send-topup-context";
import Link from "next/link";
import { getOrderDetails, getOrderHistory } from "@/services/profile.service";
import userContext from "@/states/user-context";
import moment from "moment";
import { OrderT } from "@/services/type";
import { nextBIllingDate } from "@/utils";
import contactsContext from "@/states/contacts-context";

function Success() {
  const {
    user: { user, token },
  } = useContext(userContext);
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const { product, onProductChange } = useContext(productContext);
  const [openSaveContactModal, setOpenSaveContactModal] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    const orderId = searchParams.get("order_id");

    if (orderId) {
      // write a get order details function
      getOrderDetails(orderId, token).then((order) => {
        setTransaction(order);
        // setSendTopup({
        //   ...sendTopup,
        //   transactionId: order.transactionId,
        // });
      });
    }
  }, [searchParams]);

  const fetchOrderHistory = async (
    metadata: IPageMetadata = defaultPageMetadata,
  ) => {
    const response = await getOrderHistory(metadata, token);
    // setOrderHistory(response);
    // console.log(response);
  };

  const nextPaymentDate = new Date(
    Date.now() + Number(sendTopup.topupFrequency) * 24 * 60 * 60 * 1000,
  )
    .toDateString()
    .split(" ")
    .splice(1, 4)
    .join(" ");

  const handleSendAnotherTopup = () => {
    onProductChange({} as Product);
    router.push("/send-topup/options");
  };
  const navigateToAccountHome = () => {
    router.push("/account/home");
    onProductChange({} as Product);
  };
  const { contacts } = useContext(contactsContext);
  const receiverContact = contacts?.items?.filter?.(
    (c) => c.phoneNumber === transaction?.receiver,
  )?.[0];

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
          {moment(transaction?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          {/* 22 Mar 2024, 03:07 PM */}
        </Textt>

        {transaction?.subscription?.interval && (
          <div className="mt-2 flex items-center justify-start gap-2">
            <Image
              src={"/assets/icons/schedule-icon.svg"}
              alt={"success"}
              width={16}
              height={17}
            />

            <Textt variant="span1-satoshi">
              Auto top-up every {transaction?.subscription?.interval} days 
            </Textt>
          </div>
        )}

        <button className="mt-2 flex h-[34px] w-[120px] items-center justify-center gap-[10px] rounded-full border border-[#DDD]">
          {transaction && (
            <Link href={transaction.receiptUrl ?? "#"} target="_blank">
              <Textt variant="span2-satoshi">View receipt</Textt>
            </Link>
          )}
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
          {!receiverContact && (
            <Textt variant="h4-satoshi" className="text-start">
              {transaction?.receiver}
            </Textt>
          )}
          {receiverContact && (
            <div className={`flex items-center justify-start gap-2`}>
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
              <Textt variant="h4-satoshi" className="text-start">
                {receiverContact?.name?.split?.(" ")?.[0]}
              </Textt>
            </div>
          )}

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
              {sendTopup?.transactionId ?? null}
              {/* 10052435 */}
            </Textt>
          </div>

          <div className="flex gap-2">
            <Textt variant="p1-satoshi" className="text-start">
              Sent {moment(transaction?.createdAt).fromNow()}
            </Textt>
            <Image
              src={"/assets/icons/lighting-bolt-icon.svg"}
              alt={"right"}
              width={8}
              height={15}
            />
          </div>
        </div>

        <hr className="my-6" />

        {/* // */}
        {transaction?.subscription && (
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <Textt variant="h6-satoshi" className="text-start">
                Scheduled top-up set
              </Textt>

              <button className="flex h-[34px] w-[120px] items-center justify-center gap-[10px] rounded-full border border-[#DDD]">
                <Link href={"/account/auto-topups"}>
                  <Textt variant="span2-satoshi">See more</Textt>
                </Link>
                <Image
                  src={"/assets/icons/arrow-right.svg"}
                  alt={"right"}
                  width={5}
                  height={9}
                />
              </button>
            </div>

            <Textt variant="p1-satoshi" className="mt-2 text-start">
              Next payment on{" "}
              {nextBIllingDate(
                moment(transaction?.createdAt).toDate(),
                transaction?.subscription?.type,
              )}
              {/* Next payment on 21 Apr 2024 */}
            </Textt>
          </div>
        )}

        <MyButton variant="primary-normal" onClick={handleSendAnotherTopup}>
          <Textt variant="h5-satoshi" className="text-white">
            Send another top-up
          </Textt>
        </MyButton>

        <MyButton
          onClick={navigateToAccountHome}
          variant="light-normal"
          className="mt-3"
        >
          <Textt variant="h5-satoshi" className="text-[#6D6D6D]">
            Done
          </Textt>
        </MyButton>
      </Card>

      {/* save contact modal */}
      <SaveContactModal
        open={openSaveContactModal}
        onClose={() => setOpenSaveContactModal(false)}
        phone={transaction?.receiver}
      />
    </>
  );
}

export default withAuth(Success);
