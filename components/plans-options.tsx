import React from "react";
import Card from "./card";
import Textt from "./text";
import Image from "next/image";

interface IPlan {
  id: number;
  title: string;
  priceInUSD: number;
  validityPeriod: number;
  plan: string;
  isPopular?: boolean;
}

const plansOptions: IPlan[] = [
  {
    id: 1,
    title: "Monthly IAT Voice+Data+SMS",
    priceInUSD: 14.49,
    validityPeriod: 30,
    plan: "1000Min 10GB +100SMS",
    isPopular: true,
  },
  {
    id: 2,
    title: "Weekly IAT Voice+SMS",
    priceInUSD: 2.79,
    validityPeriod: 7,
    plan: "500Min + 50SMS",
    isPopular: false,
  },
  {
    id: 3,
    title: "Weekly IAT Data 2GB",
    priceInUSD: 5.59,
    validityPeriod: 14,
    plan: "500Min + 50SMS",
    isPopular: false,
  },
];

function PlansOptions() {
  return (
    <>
      {plansOptions.map((plan) => (
        <div key={plan.id} className="mb-[10px]">
          <Card
            className={`relative ${plan.isPopular ? "border-2 border-black" : "border border-[#DBDBDB]"}`}
          >
            <Textt variant="h4-satoshi" className="blocks text-start">
              {plan.title}
            </Textt>

            <div className="mt-[10px] flex items-end justify-between">
              <span className="flex items-end justify-start gap-1">
                <Textt variant="span2-satoshi" className="blocks text-start">
                  Valid for {plan.validityPeriod} days
                </Textt>
              </span>

              <button className="h-full min-h-[38px] w-[120px] rounded-full bg-[#04A94D] text-white ">
                <Textt variant="span1-satoshi" className="text-white">
                  Buy {plan.priceInUSD} USD
                </Textt>
              </button>
            </div>

            <div className="mt-[10px] flex items-center justify-start gap-2">
              <div className="h-2 w-2 rounded-full bg-[#808080]"></div>
              <Textt variant="span2-satoshi" className="blocks text-start">
                {plan.plan}
              </Textt>
            </div>

            {/* popular badge */}
            {plan.isPopular && (
              <div className="p absolute -top-2.5 left-4 flex h-[22px] w-[74px] items-center justify-center gap-[6px] rounded-full bg-primary font-satoshi text-[10px] font-bold leading-[13.14px] text-white">
                <Image
                  src={"/assets/icons/star-icon.svg"}
                  alt={"star"}
                  width={12}
                  height={12}
                />

                <span>Popular</span>
              </div>
            )}
          </Card>
        </div>
      ))}
    </>
  );
}

export default PlansOptions;
