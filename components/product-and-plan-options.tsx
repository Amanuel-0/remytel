"use client";
import React, { useContext, useEffect, useState } from "react";
import Card from "./card";
import { LoadingSpinner } from "./loading-spinner";
import PlansOptions from "./plans-options";
import Textt from "./text";
import TopupToDetailCard from "./topup-to-detail-card";
import TopupOptions, { TopupOptionsSkeleton } from "./topups-options";
import { Product } from "@/models";
import { getProducts, updateProfile } from "@/services";
import productContext from "@/states/product-context";
import sendTopupContext from "@/states/send-topup-context";
import userContext from "@/states/user-context";
import { toast } from "sonner";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next-nprogress-bar";

type MenuType = "topup" | "plans";

interface OptionsProps {
  handleAutoTopupModal?: (value: boolean) => void;
  className?: string;
}

function ProductAndPlanOptions({
  handleAutoTopupModal,
  className,
}: OptionsProps) {
  const searchParams = useSearchParams();
  const selectedOption = searchParams.get("selectedOption");
  const newUser = searchParams.get("newUser");
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
    setLoading(true);
    if (products?.length !== 0) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      if (products) {
        setProducts(products);
      }
    };

    fetchProducts();
  }, []);

  const router = useRouter();

  const [selectIsLoading, setSelectIsLoading] = useState<string | null>(null);
  const handleProductSelection = (productId: number) => {
    setSelectIsLoading(`${productId}`);
    const selectedProduct: Product | undefined = products?.find((product) => {
      return product.id === productId;
    });
    if (selectedProduct) {
      onProductChange(selectedProduct);
      setSendTopup({ ...sendTopup, product: selectedProduct });

      // navigate to login if user is not logged in
      if (user) {
        handleAutoTopupModal && handleAutoTopupModal(true);
        // setOpenAutoTopupModal(true);
      } else {
        router.push(
          `/send-topup/signup?selectedOption=${productId}${newUser === "true" && "&newUser=true"}`,
        );
      }
    } else {
      toast.error("Something went wrong, please try again later");
    }
    setSelectIsLoading(null);
  };
  useEffect(() => {
    if (
      selectedOption &&
      sendTopup &&
      handleAutoTopupModal &&
      products &&
      products?.length !== 0 &&
      setSendTopup
    ) {
      const productId = parseInt(selectedOption);
      if (productId) {
        if (productId === product.id) {
          handleAutoTopupModal(true);
          return;
        }
        const selectedProduct: Product | undefined = products?.find(
          (product) => {
            return product.id === productId;
          },
        );
        if (selectedProduct) {
          onProductChange(selectedProduct);
          setSendTopup({ ...sendTopup, product: selectedProduct });

          // navigate to login if user is not logged in
          if (user) {
            handleAutoTopupModal && handleAutoTopupModal(true);
            // setOpenAutoTopupModal(true);
          } else {
            router.push(`/send-topup/signup?selectedOption=${productId}`);
          }
        } else {
          toast.error("Something went wrong, please try again later");
        }
      }
    }
  }, [selectedOption, user, router, products, sendTopup]);
  const handleMenuSelectionChange = (menu: MenuType) => {
    setSelectedMenu(menu);
  };

  return (
    <Card className={`mt-5 ${className}`}>
      <div>
        <Textt variant="p1-satoshi" className="text-start">
          Select a top-up
        </Textt>

        {/* menu */}
        <div className="mt-4 flex w-[235px] gap-4">
          <button
            className={`flex h-full min-h-[44px] w-full items-center justify-center gap-[10px] rounded-full  border-2 bg-white text-primary transition-all duration-300 ${selectedMenu === "topup" ? " border-black" : "border-transparent"}`}
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
            className={`flex h-full min-h-[44px] w-full items-center justify-center gap-[10px] rounded-full  border-2 bg-white text-primary transition-all duration-300 ${selectedMenu === "plans" ? " border-black" : "border-transparent"}`}
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
              <TopupOptionsSkeleton />
            ) : (
              <>
                {selectedMenu === "topup" ? (
                  <TopupOptions
                    products={(products ?? []).filter(
                      (product) => product.type === "Airtime",
                    )}
                    onProductSelection={handleProductSelection}
                    loadingId={selectIsLoading}
                  />
                ) : (
                  <PlansOptions
                    products={(products ?? []).filter(
                      (product) => product.type === "Bundle",
                    )}
                    onProductSelection={handleProductSelection}
                    loadingId={selectIsLoading}
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
