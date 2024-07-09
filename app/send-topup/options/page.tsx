"use client";
import React, { useContext, useEffect, useState } from "react";
import Textt from "@/components/text";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import { getProducts } from "@/services";
import productContext from "@/states/product-context";
import sendTopupContext from "@/states/send-topup-context";
import { Product } from "@/models";
import SetAutoTopupModal from "@/components/set-auto-topup-modal";
import ProductAndPlanOptions from "@/components/product-and-plan-options";
import { useSearchParams } from "next/navigation";
import { getRequest } from "@/services/request.service";
import userContext from "@/states/user-context";

type MenuType = "topup" | "plans";

function TopUpAndPlans() {
  const { product } = useContext(productContext);
  const { sendTopup } = useContext(sendTopupContext);
  const [loading, setLoading] = useState(true);
  // const [openEditSenderPhoneModal, setOpenEditSenderPhoneModal] =
  //   React.useState(false);
  const [openAutoTopupModal, setOpenAutoTopupModal] = React.useState(false);
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");
  const {
    user: { token, user },
  } = useContext(userContext);
  const { setSendTopup } = useContext(sendTopupContext);
  useEffect(() => {
    if (requestId) {
      getRequest(requestId as string, token).then((d) => {
        setSendTopup({
          from: user.phoneNumber,
          to: d?.senderPhoneNumber as string,
          fromCountryCode: "US",
          product: undefined,
          topupFrequency: undefined,
        });
      });
    }
  }, [requestId]);

  useEffect(() => {
    setLoading(true);
    if (product) {
      setLoading(false);
    }
  }, [product]);

  return (
    <>
      <Textt variant="h4-craftwork">You’re sending Remytel top-up to</Textt>

      <div className="mt-5">
        <TopupToDetailCard phone={sendTopup.to} />
      </div>

      <ProductAndPlanOptions handleAutoTopupModal={setOpenAutoTopupModal} />

      {/* show auto topup modal */}
      <SetAutoTopupModal
        open={openAutoTopupModal}
        onClose={() => setOpenAutoTopupModal(false)}
      />
    </>
  );
}

export default TopUpAndPlans;
