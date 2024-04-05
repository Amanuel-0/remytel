"use client";
import React from "react";
import Image from "next/image";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import Card from "@/components/card";
import SendYourFirstTopupBanner from "@/components/send-your-first-topup-banner";

function AccountHome() {
  const [noActivity, setNoActivity] = React.useState(true);
  const [noContact, setNoContact] = React.useState(true);
  const [noAutoTopup, setNoAutoTopup] = React.useState(true);

  return (
    <div>
      {/*  */}
      <section className="my-5 flex w-full flex-col gap-5 md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-between">
          {/* go back to account */}
          <button className="flex hidden h-12 w-12  min-w-12 items-center justify-center rounded-full bg-white">
            <Image
              src={"/assets/icons/arrow-back-black-icon.svg"}
              alt={"arrow-back-black-icon"}
              width={16}
              height={16}
            />
          </button>

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
                Oumer Sualih
              </Textt>
              <Textt variant="span2-satoshi" className="mt-1 text-start">
                +251 93 542 5899
              </Textt>
            </div>
          </div>

          <div className="flex items-center justify-end gap-[10px]">
            <button className="flex h-12 w-12  min-w-12 items-center justify-center rounded-full bg-white">
              <Image
                src={"/assets/icons/question-icon.svg"}
                alt={"question-icon"}
                width={16}
                height={16}
              />
            </button>
            <button className="flex h-12 w-full min-w-[68px] max-w-[136px] items-center justify-center gap-[10px] rounded-[30px] bg-white px-5">
              <Image
                src={"/assets/icons/setting-black-icon.svg"}
                alt={"setting-icon"}
                width={15}
                height={16}
              />

              <Textt variant="span1-satoshi" className="hidden md:block">
                Settings
              </Textt>
              <div className="h-[10px] w-[10px] rounded-full bg-[#FF9142]"></div>
            </button>
          </div>
        </div>

        <div>
          <MyButton
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
        {noActivity && <SendYourFirstTopupBanner />}

        {!noActivity && (
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
              {[1, 2, 3].map((item, index) => (
                <>
                  {/* row */}
                  <div
                    className={`align-content-between grid w-full grid-cols-12 gap-2 py-5 ${index !== 2 ? "border-b" : ""}`}
                  >
                    {/* cell 1 */}
                    <div className="col-span-6 flex items-center md:col-span-3 md:w-full">
                      <Textt
                        variant="span1-satoshi"
                        className={`text-start ${index !== 1 ? "visible" : "hidden"}`}
                      >
                        +251 91 252 1249
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
                        Every 30 days
                      </Textt>
                    </div>

                    {/* cell 3 */}
                    <div className="col-span-6 md:col-span-3 md:w-full">
                      <div className="flex flex-col gap-2">
                        <Textt variant="span1-satoshi" className="text-start">
                          Weekly IAT Voice+SMS
                        </Textt>
                        <Textt variant="span1-satoshi" className="text-start">
                          13.45 USD
                        </Textt>
                      </div>
                    </div>

                    {/* cell 4 */}
                    <div className="col-span-6 flex justify-end md:col-span-3 md:w-full">
                      <MyButton
                        variant="primary-normal"
                        className="max-w-[110px]"
                      >
                        <Textt variant="span1-satoshi" className="text-white">
                          Resend
                        </Textt>
                      </MyButton>
                    </div>
                  </div>
                </>
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
                <button className="flex items-center justify-center gap-[10px]">
                  <Textt variant="span1-satoshi">All Contacts</Textt>
                  <Image
                    src={"/assets/icons/arrow-right-thin-black.svg"}
                    alt={"arrow-right-black-icon"}
                    width={12}
                    height={12}
                  />
                </button>
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
                <button className="flex items-center justify-center gap-[10px]">
                  <Textt variant="span1-satoshi">View All</Textt>
                  <Image
                    src={"/assets/icons/arrow-right-thin-black.svg"}
                    alt={"arrow-right-black-icon"}
                    width={12}
                    height={12}
                  />
                </button>
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

export default AccountHome;
