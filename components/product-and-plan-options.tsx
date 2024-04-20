"use client";
import React, { useContext, useEffect, useState } from "react";
import Card from "./card";
import { LoadingSpinner } from "./loading-spinner";
import PlansOptions from "./plans-options";
import Textt from "./text";
import TopupToDetailCard from "./topup-to-detail-card";
import TopupOptions from "./topups-options";
import { Product } from "@/models";
import { getProducts } from "@/services";
import productContext from "@/states/product-context";
import sendTopupContext from "@/states/send-topup-context";
import userContext from "@/states/user-context";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

type MenuType = "topup" | "plans";

interface OptionsProps {
  handleAutoTopupModal?: (value: boolean) => void;
}

function ProductAndPlanOptions({ handleAutoTopupModal }: OptionsProps) {
  const {
    user: { user },
  } = useContext(userContext);
  const { product, onProductChange } = useContext(productContext);
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const [selectedMenu, setSelectedMenu] = React.useState<MenuType>("topup");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  // const [openEditSenderPhoneModal, setOpenEditSenderPhoneModal] =
  //   React.useState(false);

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

  const router = useRouter();

  const handleProductSelection = (productId: number) => {
    const selectedProduct: Product | undefined = products?.find((product) => {
      return product.id === productId;
    });
    if (selectedProduct) {
      onProductChange(selectedProduct);
      setSendTopup({ ...sendTopup, product: selectedProduct });

      // navigate to login if user is not logged in
      if (user) {
        console.log("product selected: product id is: ", productId);
        handleAutoTopupModal && handleAutoTopupModal(true);
        // setOpenAutoTopupModal(true);
      } else {
        router.push(`/send-topup/signup`);
      }
    } else {
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleMenuSelectionChange = (menu: MenuType) => {
    setSelectedMenu(menu);
  };

  return (
    <Card className="mt-5">
      <div>
        <Textt variant="p1-satoshi" className="text-start">
          Select a top-up
        </Textt>

        {/* menu */}
        <div className="mt-4 flex w-[235px] gap-4">
          <button
            className={`flex h-full min-h-[44px] w-full items-center justify-center gap-[10px] rounded-full  bg-white text-primary ${selectedMenu === "topup" ? "border-2 border-black" : ""}`}
            onClick={() => handleMenuSelectionChange("topup")}
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
            onClick={() => handleMenuSelectionChange("plans")}
          >
            <Image
              src={"/assets/icons/topup-icon.svg"}
              alt={"edit-icon"}
              width={14}
              height={14}
            />
            <Textt variant="span1-satoshi">Plans</Textt>
          </button>
        </div>

        <div className="mt-5">
          <>
            {loading ? (
              <LoadingSpinner className="" />
            ) : (
              <>
                {selectedMenu === "topup" ? (
                  <TopupOptions
                    products={(products ?? []).filter(
                      (product) => product.type === "Airtime",
                    )}
                    onProductSelection={handleProductSelection}
                  />
                ) : (
                  <PlansOptions
                    products={(products ?? []).filter(
                      (product) => product.type === "Bundle",
                    )}
                    onProductSelection={handleProductSelection}
                  />
                )}
              </>
            )}
          </>
        </div>
      </div>
    </Card>
  );
}

export default ProductAndPlanOptions;
