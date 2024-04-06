import React, { useEffect } from "react";
import Card from "./card";
import Textt from "./text";
import Image from "next/image";
import { Product } from "@/models";

interface TopupOptionsProps {
  products: Product[]; // product are type of 'Airtime'
  onProductSelection: (id: number) => void;
}
function TopupOptions({ products, onProductSelection }: TopupOptionsProps) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="mb-[10px]">
          <Card
            className={`relative ${false ? "border-2 border-black" : "border border-[#DBDBDB]"}`}
            // className={`relative ${topup.isPopular ? "border-2 border-black" : "border border-[#DBDBDB]"}`}
          >
            <Textt
              variant={false ? "p1-satoshi" : "p2-satoshi"}
              // variant={topup.isPopular ? "p1-satoshi" : "p2-satoshi"}
              className="blocks text-start"
            >
              They get
            </Textt>

            <div className="mt-[10px] flex items-end justify-between">
              <span className="flex items-end justify-start gap-1">
                <Textt variant="h2-satoshi" className="blocks text-start">
                  {product.amount}
                </Textt>
                <Textt variant="span1-satoshi" className="blocks text-start">
                  ETB
                </Textt>
              </span>

              <button
                onClick={() => onProductSelection(product.id)}
                className="h-full min-h-[38px] w-[120px] rounded-full bg-[#04A94D] text-white "
              >
                <Textt variant="span1-satoshi" className="text-white">
                  Buy {product.price.amount} USD
                </Textt>
              </button>
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

export default TopupOptions;
