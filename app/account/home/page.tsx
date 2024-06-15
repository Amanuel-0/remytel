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
import { Product, Transaction } from "@/models";
import SetAutoTopupModal from "@/components/set-auto-topup-modal";
import topupRequestContext from "@/states/request-topup-context";
import sendTopupContext from "@/states/send-topup-context";

function AccountHome() {
  // const { isLoggedIn } = useContext(authContext);
  const { user } = useContext(userContext);
  const {
    loading,
    orderHistory,
    refetch,
    subscriptionHistory,
    orderError,
    subscriptionError,
  } = useContext(historyContext);
  const [noActivity, setNoActivity] = React.useState(false);
  const [noContact, setNoContact] = React.useState(false);
  const [noAutoTopup, setNoAutoTopup] = React.useState(false);
  const router = useRouter();
  //
  const [openSaveContactModal, setOpenSaveContactModal] = React.useState(false);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/login");
  //   }
  // }, []);

  const navigateToHelpPage = () => router.push("/help");
  const navigateToAccountSettingsPage = () => router.push("/account/settings");
  const navigateToSendTopupTo = () => {
    router.push("/send-topup/to");
  };
  if (loading) return <LoadingSpinner />;
  if (orderError || subscriptionError) return <p>Error</p>;
  return (
    <div>
      {/* save contact modal */}
      <SaveContactModal
        open={openSaveContactModal}
        onClose={() => setOpenSaveContactModal(false)}
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
                  ? user.user.firstName + " " + user.user.lastName || ""
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
          subscriptionHistory?.items?.length === 0 && (
            <div className="w-full md:max-w-[65%]">
              <SendYourFirstTopupBanner />
            </div>
          )}

        {orderHistory?.items?.length !== 0 &&
          subscriptionHistory?.items?.length !== 0 && (
            <Card className="w-full md:max-w-[65%]">
              <div className="mt-2 flex items-center justify-between">
                <Textt variant="h4-craftwork" className="text-start">
                  Recent Activities
                </Textt>

                <button className="flex items-center justify-center gap-[10px]">
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
                {subscriptionHistory?.items.map((item, index) => (
                  <RecentActivity
                    key={item.id}
                    index={index}
                    receiver={item.receiver}
                    type={item.type}
                    product={item.product}
                    activityType="subscriptionSent"
                  />
                ))}
                {orderHistory?.items.map((item, index) => (
                  <RecentActivity
                    key={item.id}
                    index={index}
                    receiver={item.receiver}
                    product={item.product}
                    activityType="orderSent"
                  />
                ))}
              </div>
            </Card>
          )}

        <div className="w-full md:max-w-[35%]">
          <Card className="mb-[10px] w-full">
            <div className="mt-2 flex items-center justify-between">
              <Textt variant="h4-craftwork" className="text-start">
                Contacts
              </Textt>

              {!noContact && (
                <Link
                  href={"/account/contacts"}
                  className="flex items-center justify-center gap-[10px]"
                >
                  <Textt variant="span1-satoshi">All Contacts</Textt>
                  <Image
                    src={"/assets/icons/arrow-right-thin-black.svg"}
                    alt={"arrow-right-black-icon"}
                    width={12}
                    height={12}
                  />
                </Link>
              )}
            </div>

            <div className="mt-5 flex items-center justify-start gap-2">
              {noContact && (
                <div>
                  <Textt
                    variant="span1-craftwork"
                    className="mt-3 text-start font-medium text-[#1D3462]"
                  >
                    Send a little happiness easily to your loved ones
                  </Textt>

                  <button
                    type="button"
                    onClick={() => setOpenSaveContactModal(true)}
                    className="mt-5 flex items-center justify-center gap-2"
                  >
                    <Textt variant="span1-satoshi" className="text-primary">
                      Add Contact
                    </Textt>

                    <Image
                      src={"/assets/icons/add-green-icon.svg"}
                      alt={"contacts-icon"}
                      width={11}
                      height={11}
                    />
                  </button>
                </div>
              )}

              {!noContact && (
                <>
                  <div className="flex h-[80px] w-[70px] flex-col items-center justify-between rounded-[15px] border border-[#F0F0F0] p-2">
                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#80C03F] text-white ">
                      <Image
                        src={"/assets/icons/account-white.svg"}
                        alt={"account-white"}
                        width={16}
                        height={19}
                      />
                    </div>

                    <Textt variant="span1-satoshi">Brook</Textt>
                  </div>

                  <div className="flex h-[80px] w-[70px] flex-col items-center justify-between rounded-[15px] border border-[#F0F0F0] p-2">
                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#3FC0B8] text-white ">
                      <Image
                        src={"/assets/icons/account-white.svg"}
                        alt={"account-white"}
                        width={16}
                        height={19}
                      />
                    </div>

                    <Textt variant="span1-satoshi">Adnam</Textt>
                  </div>

                  <div className="flex h-[80px] w-[70px] flex-col items-center justify-between rounded-[15px] border border-[#F0F0F0] p-2">
                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#C0753F] text-white ">
                      <Image
                        src={"/assets/icons/account-white.svg"}
                        alt={"account-white"}
                        width={16}
                        height={19}
                      />
                    </div>

                    <Textt variant="span1-satoshi">Alamin</Textt>
                  </div>
                </>
              )}
            </div>
          </Card>

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

              {!noAutoTopup && (
                <Textt variant="h6-satoshi" className="text-start text-primary">
                  2 active
                </Textt>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

export interface RecentActivityProps {
  index: number;
  receiver: string;
  type?: string;
  product?: Product;
  activityType: "subscriptionSent" | "orderSent";
  oneTime?: Transaction;
}
export const RecentActivity = ({
  index,
  receiver,
  type,
  product,
  activityType,
  oneTime,
}: RecentActivityProps) => {
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const {
    user: { user },
  } = useContext(userContext);
  return (
    <>
      {/* row */}
      <div
        className={`align-content-between grid w-full grid-cols-12 gap-2 py-3 ${index !== 2 ? "border-b" : ""}`}
      >
        {/* cell 1 */}
        <div className="col-span-6 flex items-center md:col-span-3 md:w-full">
          <Textt
            variant="span1-satoshi"
            className={`text-start ${index !== 1 ? "visible" : "hidden"}`}
          >
            {receiver}
          </Textt>

          {/* showed if contact is saved */}
          <div
            className={`flex items-center justify-start gap-2 ${index === 1 ? "visible" : "hidden"}`}
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
            <Textt variant="span1-satoshi">Brook</Textt>
          </div>
        </div>
        {/* cell 2 */}
        {type ? (
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
              {type === "MONTHLY"
                ? "30"
                : type === "WEEKLY"
                  ? "7"
                  : type === "BIWEEKLY"
                    ? "14"
                    : "-"}{" "}
              days
            </Textt>
          </div>
        ) : (
          <span className="col-span-6 md:col-span-3">One Time</span>
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
        <div className="col-span-6 flex justify-end md:col-span-3 md:w-full">
          <MyButton
            variant="primary-normal"
            className="h-14 max-w-[110px]"
            onClick={() => {
              if (activityType === "orderSent" && oneTime) {
                // setSendTopup({
                //   from:user.phoneNumber,
                //   product:oneTime.product,
                //   to:receiver,
                //   topupFrequency:u,
                // });
              }
            }}
          >
            <Textt variant="span1-satoshi" className="text-white">
              Resend
            </Textt>
          </MyButton>
        </div>
      </div>
    </>
  );
};

export default withAuth(AccountHome);
