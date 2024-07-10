import React, { useEffect } from "react";
import Card from "./card";
import Textt from "./text";
import Image from "next/image";
import { Product } from "@/models";
import MyButton from "./ui/my-button";

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

interface PlansOptionsProps {
  products: Product[]; // product are type of 'Bundle'
  onProductSelection: (id: number) => void;
  loadingId?: string | null;
}
function PlansOptions({
  products,
  onProductSelection,
  loadingId,
}: PlansOptionsProps) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="mb-[10px]">
          <Card
            className={`relative ${false ? "border-2 border-black" : "border border-[#DBDBDB]"}`}
            // className={`relative ${plan.isPopular ? "border-2 border-black" : "border border-[#DBDBDB]"}`}
          >
            <Textt variant="h4-satoshi" className="blocks text-start">
              {product.name}
            </Textt>

            <div className="mt-[3px] flex items-end justify-between">
              <span className="flex items-end justify-start gap-1">
                <Textt
                  variant="span2-satoshi"
                  className="blocks text-start text-xs"
                >
                  Valid for unknown days
                  {/* Valid for {product?.validityPeriod} days */}
                </Textt>
              </span>

              <MyButton
                onClick={() => onProductSelection(product.id)}
                className="h-full min-h-[35px] w-max rounded-full bg-[#04A94D] px-6 text-white transition-colors duration-300 hover:bg-[hsl(147,95%,28%)]"
              >
                <Textt variant="span1-satoshi" className="text-white">
                  Buy {product.price.amount} USD
                </Textt>
              </MyButton>
            </div>

            <div className="mt-[10px] flex items-center justify-start gap-2">
              <div className="h-2 w-2 rounded-full bg-[#808080]"></div>
              <Textt
                variant="span2-satoshi"
                className="blocks text-start text-xs"
              >
                {product.description}
              </Textt>
            </div>

            {/* popular badge */}
            {false && (
              // {product.isPopular && (
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
