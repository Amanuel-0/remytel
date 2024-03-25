"use client";
import React from "react";
import Image from "next/image";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptions from "@/components/topups-options";
import PlansOptions from "@/components/plans-options";
import TopupToDetailCard from "@/components/topup-to-detail-card";

type MenuType = "topup" | "plans";

function TopUpAndPlans() {
  const [selectedMenu, setSelectedMenu] = React.useState<MenuType>("topup");

  const handleOptionChange = (menu: MenuType) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <Textt variant="h4-craftwork">You’re senRemytel top-up to</Textt>

      <div className="mt-5">
        <TopupToDetailCard />
      </div>

      {/* topups & plans */}
      <Card className="mt-5">
        <Textt variant="p1-satoshi" className="text-start">
          Select a top-up
        </Textt>

        {/* menu */}
        <menu className="mt-4 flex w-[235px] gap-4">
          <button
            className={`flex h-full min-h-[44px] w-full items-center justify-center gap-[10px] rounded-full  bg-white text-primary ${selectedMenu === "topup" ? "border-2 border-black" : ""}`}
            onClick={() => handleOptionChange("topup")}
          >
            <Image
              src={"/assets/icons/topup-icon.svg"}
              alt={"edit-icon"}
              width={14}
              height={14}
            />
            <Textt variant="span1-satoshi">Top-up</Textt>
          </button>
          <button
            className={`flex h-full min-h-[44px] w-full items-center justify-center gap-[10px] rounded-full  bg-white text-primary ${selectedMenu === "plans" ? "border-2 border-black" : ""}`}
            onClick={() => handleOptionChange("plans")}
          >
            <Image
              src={"/assets/icons/topup-icon.svg"}
              alt={"edit-icon"}
              width={14}
              height={14}
            />
            <Textt variant="span1-satoshi">Plans</Textt>
          </button>
        </menu>

        <div className="mt-5">
          {selectedMenu === "topup" ? <TopupOptions /> : <PlansOptions />}
        </div>
      </Card>
    </>
  );
}

export default TopUpAndPlans;
