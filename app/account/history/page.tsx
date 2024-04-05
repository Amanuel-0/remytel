import React from "react";
import Image from "next/image";
import Card from "@/components/card";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";

function History() {
  return (
    <div>
      {/*  */}
      <section className="my-5 flex w-full flex-col gap-5 md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <button className="flex h-11 w-11  min-w-12 items-center justify-center rounded-full bg-white">
              <Image
                src={"/assets/icons/arrow-back-black-icon.svg"}
                alt={"arrow-back-black-icon"}
                width={16}
                height={16}
              />
            </button>
            <Textt variant="h6-satoshi" className="hidden md:block">
              My Account
            </Textt>
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
        </div>
      </section>

      {/*  */}
      <section className="my-[10px]">
        <Card className="w-full">
          <Textt variant="h4-craftwork" className="mt-2 text-start ">
            Today
          </Textt>

          {/* table */}
          <div className="mt-5">
            {[1, 2, 3].map((item, index) => (
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
                          Brook received 138.00 ETB
                        </Textt>
                        <Textt
                          variant="span2-satoshi"
                          className="mt-2 text-start"
                        >
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
              </>
            ))}
          </div>

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

export default History;
