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

type MenuType = "topup" | "plans";

function TopUpAndPlans() {
  const { product } = useContext(productContext);
  const { sendTopup } = useContext(sendTopupContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  // const [openEditSenderPhoneModal, setOpenEditSenderPhoneModal] =
  //   React.useState(false);
  const [openAutoTopupModal, setOpenAutoTopupModal] = React.useState(
    product && true,
  );

  useEffect(() => {
    console.log("window location", window.location.pathname);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (product) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      if (!!products) {
        console.log("products: ", product);
        setProducts(products);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Textt variant="h4-craftwork">You’re senRemytel top-up to</Textt>

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
