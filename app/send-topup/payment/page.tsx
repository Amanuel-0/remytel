"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import React, { useContext } from "react";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import MyButton from "@/components/ui/my-button";
import { useRouter } from "next/navigation";
import productContext from "@/states/product-context";
import { DatePickerDemo } from "@/components/ui/date-picker";
import EditReceiverPhoneModal from "@/components/edit-receiver-phone-modal";
import sendTopupContext from "@/states/send-topup-context";
// import { useDayPicker, DayPickerProvider } from "react-day-picker";

function Payment() {
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const { product } = useContext(productContext);
  const [showPaymentDetail, setShowPaymentDetail] = React.useState(true);
  const router = useRouter();
  const [openEditSenderPhoneModal, setOpenEditSenderPhoneModal] =
    React.useState(false);

  const handleProductEdit = () => {
    router.push(`/send-topup/options`);
  };

  const handleTogglePaymentDetail = () => {
    setShowPaymentDetail(!showPaymentDetail);
  };

  const navigateToSuccess = () => router.push(`/send-topup/success`);

  return (
    <>
      <Textt variant="h4-craftwork" className="text-start">
        Payment
      </Textt>

      {/* This card was what was previously => <TopupToDetailCard /> */}
      <Card>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="flex items-center justify-center gap-3">
              <Image
                src={"/assets/images/flags/ethiopian-flag.png"}
                alt="ethiopian-flag"
                width={30}
                height={30}
              />
              <Textt variant="h6-satoshi">{sendTopup.to}</Textt>

              <Image
                src={"/assets/images/ethiotel-logo.svg"}
                alt="ethiotel-logo"
                width={55}
                height={14}
              />
            </span>
          </div>

          <IconButton
            className="h-8 w-8"
            onClick={() => setOpenEditSenderPhoneModal(true)}
          >
            <Image
              src={"/assets/icons/edit-icon.svg"}
              alt={"edit-icon"}
              width={14}
              height={14}
            />
          </IconButton>
        </div>

        {sendTopup.topupFrequency && (
          <div className="mt-7 flex items-center justify-start gap-2">
            <Image
              src={"/assets/icons/schedule-icon.svg"}
              alt={"schedule-icon"}
              width={16}
              height={17}
            />
            <Textt variant="span1-satoshi">
              Auto top-up every {sendTopup.topupFrequency} days 
            </Textt>
          </div>
        )}
      </Card>

      {/* This card was what was previously => <TopupOptionDetailCard /> */}
      <Card className="mt-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center justify-center gap-3">
            <Textt variant="h6-satoshi">{`You're senRemytel`}</Textt>
            <Textt variant="h6-satoshi" className="text-primary">
              {product.amount} ETB
            </Textt>
          </span>

          <IconButton className="h-8 w-8" onClick={handleProductEdit}>
            <Image
              src={"/assets/icons/edit-icon.svg"}
              alt={"edit-icon"}
              width={14}
              height={14}
            />
          </IconButton>
        </div>

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
                <Textt variant="span1-satoshi">{product.price.total} USD</Textt>

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

                <Textt variant="span1-satoshi">{product.price.total} USD</Textt>
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
      </Card>

      {/* select card */}
      <Card className="mt-5">
        <div className="flex items-center justify-between">
          {/* radio start */}
          <div className="inline-flex items-center">
            <label
              className="relative flex cursor-pointer items-center rounded-full p-3"
              htmlFor="green"
            >
              <input
                name="subscription"
                type="radio"
                className="before:content[''] before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#808080] text-green-500 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-[10px] checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                id="green"
              />
              <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="6"></circle>
                </svg>
              </span>
            </label>

            <Textt variant="span2-satoshi">Card</Textt>
          </div>
          {/* radio end */}

          <div className="flex items-center justify-end gap-7">
            <Image
              src="/assets/images/visa-logo.svg"
              alt=""
              width={63}
              height={20}
            />
            <Image
              src="/assets/images/master-card-logo.svg"
              alt=""
              width={44}
              height={34}
            />
            {/* <Image
              src="/assets/images/paypal-logo.svg"
              alt=""
              width={27}
              height={30}
            /> */}
          </div>
        </div>

        <hr className="hidden md:block" />

        <div className="flex items-center justify-between">
          {/* radio start */}
          <div className="inline-flex items-center">
            <label
              className="relative flex cursor-pointer items-center rounded-full p-3"
              htmlFor="green"
            >
              <input
                name="subscription"
                type="radio"
                className="before:content[''] before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#808080] text-green-500 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-[10px] checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                id="green"
              />
              <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="6"></circle>
                </svg>
              </span>
            </label>

            <Textt variant="span2-satoshi">Paypal</Textt>
          </div>
          {/* radio end */}

          <Image
            src="/assets/images/paypal-logo.svg"
            alt=""
            width={27}
            height={30}
          />
        </div>
      </Card>

      <Card className="mt-5">
        <div className="mb-[18px] h-[91px]">
          <label htmlFor="cardNumber">
            <Textt variant="h6-satoshi" className="text-start">
              Card Number
            </Textt>
          </label>
          <input
            type="text"
            placeholder="e.g. 1000123456789456"
            id="cardNumber"
            className="mt-4 block h-[54px] w-full rounded-2xl border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#808080] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
          />
        </div>

        <div className="flex justify-between gap-5">
          <div className="mb-[18px] h-[91px]">
            <label htmlFor="expiryDate">
              <Textt variant="h6-satoshi" className="text-start">
                Expiry
              </Textt>
            </label>
            <DatePickerDemo />
            {/* <DayPickerProvider initialProps={{}}>
              <DatePickerDemo />
            </DayPickerProvider> */}
            {/* <input
              type="date"
              id="expiryDate"
              className="mt-4 block h-[54px] w-full rounded-2xl border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#808080] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
            /> */}
          </div>

          <div className="mb-[18px] h-[91px]">
            <label htmlFor="ccv">
              <Textt variant="h6-satoshi" className="text-start">
                CCV
              </Textt>
            </label>
            <input
              type="text"
              placeholder="e.g. 0000"
              id="ccv"
              className="mt-4 block h-[54px] w-full rounded-2xl border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#808080] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
            />
          </div>
        </div>

        <div className="mb-[18px] h-[91px]">
          <label htmlFor="nameOnCard">
            <Textt variant="h6-satoshi" className="text-start">
              Name on Card
            </Textt>
          </label>
          <input
            type="text"
            placeholder="e.g. Oumer Sualih"
            id="nameOnCard"
            className="mt-4 block h-[54px] w-full rounded-2xl border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#808080] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
          />
        </div>

        {/* should be changed */}
        <div className="mb-[18px] h-[91px]">
          <label htmlFor="nameOnCard">
            <Textt variant="h6-satoshi" className="text-start">
              Country
            </Textt>
          </label>
          <select
            id="nameOnCard"
            className="mt-4 block h-[54px] w-full rounded-2xl border border-[#DBDBDB] bg-white p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
          >
            <option value="ethiopia">Ethiopia</option>
            <option value="america">Ethiopia</option>
          </select>
        </div>

        {/* checkbox */}
        <div className="flex w-full items-center gap-2 ">
          <input
            id="storeCard"
            className="disabled:border-steel-400 disabled:bg-steel-400 peer relative mt-1 h-6 w-6 shrink-0 appearance-none rounded-[4px] border-2 border-primary border-opacity-15 bg-white checked:border-0 checked:bg-gradient-to-br checked:from-[#80C03F] checked:to-[#2CA342] focus:outline-none focus:ring-1 focus:ring-blue-100 focus:ring-offset-0"
            type="checkbox"
          />

          <svg
            className="pointer-events-none absolute mt-1 hidden h-6 w-6 stroke-white outline-none peer-checked:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>

          <label htmlFor="storeCard">
            <Textt variant="p1-satoshi">
              Securely store card for next time
            </Textt>
          </label>
        </div>

        <MyButton
          variant="primary-normal"
          className="mt-10"
          onClick={navigateToSuccess}
        >
          <Textt variant="h5-satoshi" className="text-white">
            Pay USD ${product?.price?.amount} Now
          </Textt>
        </MyButton>
      </Card>

      {/* edit phone modal */}
      <EditReceiverPhoneModal
        open={openEditSenderPhoneModal}
        onClose={() => setOpenEditSenderPhoneModal(false)}
      />
    </>
  );
}

export default Payment;
