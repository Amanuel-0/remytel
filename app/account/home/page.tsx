"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import Card from "@/components/card";
import SendYourFirstTopupBanner from "@/components/send-your-first-topup-banner";
import userContext from "@/states/user-context";
import { useRouter } from "next/navigation";
import SaveContactModal from "@/components/save-contact-modal";
import authContext from "@/states/auth-context";
import withAuth from "@/components/protected-route";
import Link from "next/link";
import historyContext from "@/states/history-context";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Contact, Product, Transaction } from "@/models";
import SetAutoTopupModal from "@/components/set-auto-topup-modal";
import topupRequestContext from "@/states/request-topup-context";
import sendTopupContext from "@/states/send-topup-context";
import { SubscriptionT } from "@/services/type";
import productContext from "@/states/product-context";
import contactsContext from "@/states/contacts-context";
import stc from "string-to-color";
import { ContactsCard } from "./ContactsCard";

function AccountHome() {
  // const { isLoggedIn } = useContext(authContext);
  const { user } = useContext(userContext);
  const {
    loading,
    orderHistory,
    receivedOrderError,
    receivedOrderHistory,
    refetch,
    subscriptionHistory,
    orderError,
    subscriptionError,
    activeSubscriptions,
  } = useContext(historyContext);
  const [noActivity, setNoActivity] = React.useState(false);
  const [noContact, setNoContact] = React.useState(false);
  const [noAutoTopup, setNoAutoTopup] = React.useState(false);
  const router = useRouter();
  //

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/login");
  //   }
  // }, []);

  const navigateToHelpPage = () => router.push("/help");
  const navigateToAccountSettingsPage = () => router.push("/account/settings");
  const [openSaveContactModal, setOpenSaveContactModal] = React.useState(false);
  const navigateToSendTopupTo = () => {
    router.push("/send-topup/to");
  };
  const { refetch: refetchContacts } = useContext(contactsContext);
  if (loading) return <LoadingSpinner />;
  // if (orderError || subscriptionError) return <p>{orderError}</p>;
  return (
    <div>
      {/* save contact modal */}
      <SaveContactModal
        open={openSaveContactModal}
        onClose={() => {
          setOpenSaveContactModal(false);
          refetchContacts();
        }}
      />
      {/*  */}
      <section className="my-5 flex w-full flex-col gap-5 md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#80C03F] to-[#2CA342] text-white ">
              <Image
                src={"/assets/icons/account-white.svg"}
                alt={"account-white"}
                width={20}
                height={24}
              />
            </div>
            <div>
              <Textt variant="h3-satoshi" className="text-start">
                {user.user?.firstName
                  ? user.user.firstName + " " + (user.user.lastName || "")
                  : ""}
                {/* Oumer Sualih */}
              </Textt>
              {!user.user?.firstName && (
                <Link
                  href={"/account/settings/edit"}
                  className="text-xs text-slate-500 underline"
                >
                  Complete Your Profile
                </Link>
              )}
              <Textt variant="span2-satoshi" className="mt-1 text-start">
                {user.user ? user.user.phoneNumber : "no phone"}
                {/* +251 93 542 5899 */}
              </Textt>
            </div>
          </div>

          <div className="flex items-center justify-end gap-[10px]">
            <button
              type="button"
              onClick={navigateToHelpPage}
              className="flex h-12 w-12  min-w-12 items-center justify-center rounded-full bg-white"
            >
              <Image
                src={"/assets/icons/question-icon.svg"}
                alt={"question-icon"}
                width={16}
                height={16}
              />
            </button>
            <button
              type="button"
              onClick={navigateToAccountSettingsPage}
              className="flex h-12 w-full min-w-[68px] max-w-[136px] items-center justify-center gap-[10px] rounded-[30px] bg-white px-5"
            >
              <Image
                src={"/assets/icons/setting-black-icon.svg"}
                alt={"setting-icon"}
                width={15}
                height={16}
              />

              <Textt variant="span1-satoshi" className="hidden md:block">
                Settings
              </Textt>

              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF9142] opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#FF9142]"></span>
              </span>
            </button>
          </div>
        </div>

        <div className="max-h-[44px]">
          <MyButton
            type="button"
            onClick={navigateToSendTopupTo}
            variant="primary-gradient-top-left"
            className="min-w-[125px]"
          >
            <Textt
              variant="span1-satoshi"
              className="font-extrabold text-white"
            >
              Send top-up
            </Textt>
          </MyButton>
        </div>
      </section>

      {/*  */}
      <section className="my-[10px] flex w-full flex-col gap-[10px] md:flex-row">
        {/* send your fist topup banner */}
        {orderHistory?.items?.length === 0 &&
          receivedOrderHistory?.items?.length === 0 && (
            <div className="w-full md:max-w-[65%]">
              <SendYourFirstTopupBanner />
            </div>
          )}
        {(orderError || receivedOrderError) && (
          <Card className="flex w-full flex-col items-center justify-center md:max-w-[65%]">
            <p className="text-red-700">{orderError}</p>
            <p className="text-red-700">{receivedOrderError}</p>
            <MyButton
              type="button"
              onClick={refetch}
              className="mt-3 flex h-max w-max items-center justify-center gap-2 "
            >
              <Textt
                variant="span1-craftwork"
                className="mt-1 text-start font-medium text-yellow-700"
              >
                Retry
              </Textt>
            </MyButton>
          </Card>
        )}

        {(orderHistory?.items?.length || 0) > 0 &&
          (receivedOrderHistory?.items?.length || 0) > 0 && (
            <Card className="w-full md:max-w-[65%]">
              <div className="mt-2 flex items-center justify-between">
                <Textt variant="h4-craftwork" className="text-start">
                  Recent Activities
                </Textt>

                <button
                  className="flex items-center justify-center gap-[10px]"
                  onClick={() => router.push("/account/history")}
                >
                  <Textt variant="span1-satoshi">History</Textt>
                  <Image
                    src={"/assets/icons/arrow-right-thin-black.svg"}
                    alt={"arrow-right-black-icon"}
                    width={12}
                    height={12}
                  />
                </button>
              </div>

              {/* table */}
              <div className="">
                {/* {subscriptionHistory?.items.map((item, index) => (
                  <RecentActivity
                    key={item.id}
                    index={index}
                    receiver={item.receiver}
                    type={item.type}
                    product={item.product}
                    activityType="subscriptionSent"
                    subscription={item}
                  />
                ))} */}
                {orderHistory?.items.map((item, index) => (
                  <RecentActivity
                    key={item.id}
                    index={index}
                    receiver={item.receiver}
                    product={item.product}
                    order={item}
                  />
                ))}
                {receivedOrderHistory?.items.map((item, index) => (
                  <RecentActivity
                    key={item.id}
                    index={index}
                    receiver={item.receiver}
                    product={item.product}
                    order={item}
                    received
                  />
                ))}
              </div>
            </Card>
          )}

        <div className="w-full md:max-w-[35%]">
          <ContactsCard setOpenSaveContactModal={setOpenSaveContactModal} />

          <Card className="w-full">
            <div className="mt-2 flex items-center justify-between">
              <Textt variant="h4-craftwork" className="text-start">
                Auto top-up
              </Textt>

              {!noAutoTopup && (
                <Link
                  href={"/account/auto-topups"}
                  className="flex items-center justify-center gap-[10px]"
                >
                  <Textt variant="span1-satoshi">View All</Textt>
                  <Image
                    src={"/assets/icons/arrow-right-thin-black.svg"}
                    alt={"arrow-right-black-icon"}
                    width={12}
                    height={12}
                  />
                </Link>
              )}
            </div>

            <div className="mt-5">
              {noAutoTopup && (
                <Textt
                  variant="h6-satoshi"
                  className="mt-3 text-start font-medium"
                >
                  Send your first auto top-up
                </Textt>
              )}

              {!subscriptionError && !noAutoTopup && (
                <Textt variant="h6-satoshi" className="text-start text-primary">
                  {activeSubscriptions} active
                </Textt>
              )}
              {subscriptionError && (
                <div>
                  <Textt
                    variant="span1-craftwork"
                    className="mt-3 text-start font-medium text-red-700"
                  >
                    {subscriptionError}
                  </Textt>
                  <MyButton
                    type="button"
                    onClick={refetch}
                    className="mt-3 flex h-max w-max items-center justify-center gap-2 "
                  >
                    <Textt
                      variant="span1-craftwork"
                      className="mt-1 text-start font-medium text-yellow-700"
                    >
                      Retry
                    </Textt>
                  </MyButton>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

interface RecentActivityProps {
  index: number;
  receiver: string;
  product?: Product;
  order: Transaction;
  received?: boolean;
}
const RecentActivity = ({
  index,
  receiver,
  product,
  order,
  received = false,
}: RecentActivityProps) => {
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const router = useRouter();
  const { onProductChange } = useContext(productContext);
  const {
    user: { user },
  } = useContext(userContext);
  const onResend = () => {
    if (!order.subscription?.type) {
      setSendTopup({
        from: user.phoneNumber,
        product: product,
        to: receiver,
        topupFrequency: undefined,
        fromCountryCode: "US",
      });
      if (product) {
        onProductChange(product);
      }
      router.push(`/send-topup/bill`);
    } else {
      setSendTopup({
        from: user.phoneNumber,
        product: product,
        to: order?.receiver,
        topupFrequency: order.subscription?.type,
        fromCountryCode: "US",
      });
      if (product) {
        onProductChange(product);
      }
      router.push(`/send-topup/options?selectedOption=${order.planId}`);
    }
  };
  const onRequest = () => {
    router.push(`/request-topup/create-topup-link`);
  };
  const { contacts } = useContext(contactsContext);
  const receiverContact = contacts?.items?.filter?.(
    (c) => c.phoneNumber === receiver,
  )?.[0];
  const senderContact = contacts?.items?.filter?.(
    (c) => c.phoneNumber === order.profile?.phoneNumber,
  )?.[0];
  return (
    <>
      {/* row */}
      <div
        className={`align-content-between grid w-full grid-cols-12 gap-2 py-3 ${index !== 2 ? "border-b" : ""}`}
      >
        {/* cell 1 */}
        <div className="col-span-6 flex items-center md:col-span-3 md:w-full">
          {/* showed if contact is NOT saved */}
          {((!received && !receiverContact) ||
            (received && !senderContact)) && (
            <Textt variant="span1-satoshi" className={`text-start`}>
              {received ? order.profile?.phoneNumber : receiver}
            </Textt>
          )}

          {/* showed if contact is saved */}
          {((!received && receiverContact) || (received && senderContact)) && (
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
              <Textt variant="span1-satoshi">
                {
                  (received ? senderContact : receiverContact)?.name?.split?.(
                    " ",
                  )?.[0]
                }
              </Textt>
            </div>
          )}
        </div>
        {/* cell 2 */}
        {order.subscription ? (
          <div className="col-span-6 flex items-center justify-end gap-2 md:col-span-3 md:w-full md:justify-start">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
              <Image
                src={"/assets/icons/arrow-wraped-back-arrow.svg"}
                alt={"account-white"}
                width={10}
                height={8}
              />
            </div>

            <Textt variant="span1-satoshi" className="text-start">
              Every{" "}
              {order?.subscription?.type === "MONTHLY"
                ? "30"
                : order?.subscription?.type === "WEEKLY"
                  ? "7"
                  : order?.subscription?.type === "BIWEEKLY"
                    ? "14"
                    : "-"}{" "}
              days
            </Textt>
          </div>
        ) : (
          <Textt
            variant="span1-satoshi"
            className="col-span-6 self-center text-start md:col-span-3 md:w-full md:justify-start"
          >
            One Time
          </Textt>
        )}
        {/* cell 3 */}
        <div className="col-span-6 md:col-span-3 md:w-full">
          <div className="flex flex-col gap-2">
            <Textt variant="span1-satoshi" className="text-start">
              {product?.name || "-"}
            </Textt>
            <Textt variant="span1-satoshi" className="text-start">
              {product?.price?.amount || "-"} {product?.price?.currency || "-"}
            </Textt>
          </div>
        </div>
        {/* cell 4 */}
        <div className="col-span-6 flex h-max items-center justify-end md:col-span-3 md:w-full">
          {received ? (
            <MyButton
              variant="light-normal"
              className="h-14 max-w-[110px]"
              onClick={onRequest}
            >
              <Textt variant="span1-satoshi" className="h-max py-0 ">
                Request
              </Textt>
            </MyButton>
          ) : (
            <MyButton
              variant="primary-normal"
              className="h-14 max-w-[110px]"
              onClick={onResend}
            >
              <Textt variant="span1-satoshi" className="h-max py-0 text-white">
                Resend
              </Textt>
            </MyButton>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(AccountHome);
