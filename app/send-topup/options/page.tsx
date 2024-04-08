"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptions from "@/components/topups-options";
import PlansOptions from "@/components/plans-options";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import { useRouter } from "next/navigation";
import { getProducts } from "@/services";
import productContext from "@/states/product-context";
import sendTopupContext from "@/states/send-topup-context";
import { Product } from "@/models";
import { LoadingSpinner } from "@/components/loading-spinner";
import userContext from "@/states/user-context";
import { toast } from "sonner";

type MenuType = "topup" | "plans";

function TopUpAndPlans() {
  const {
    user: { user },
  } = useContext(userContext);
  const { product, onProductChange } = useContext(productContext);
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const [selectedMenu, setSelectedMenu] = React.useState<MenuType>("topup");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);

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

      // navigate to signup if user is not logged in
      if (user) {
        router.push(`/send-topup/bill`);
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
    <>
      <Textt variant="h4-craftwork">You’re senRemytel top-up to</Textt>

      <div className="mt-5">
        <TopupToDetailCard phone={sendTopup.to} />
      </div>

      {/* topups & plans */}
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
    </>
  );
}

export default TopUpAndPlans;
