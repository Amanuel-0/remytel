"use client";
import React, { useCallback, useContext, useEffect } from "react";
import Image from "next/image";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptions from "@/components/topups-options";
import PlansOptions from "@/components/plans-options";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, getProducts } from "@/services";
import { products as productsData } from "./products-data";
import productContext from "@/states/product-context";

type MenuType = "topup" | "plans";

function TopUpAndPlans() {
  const [selectedMenu, setSelectedMenu] = React.useState<MenuType>("topup");
  const [products, setProducts] = React.useState<Product[]>([]);
  const { product, onProductChange } = useContext(productContext);

  useEffect(() => {
    // setProducts(productsData);
    const fetchProducts = async () => {
      const products = await getProducts();
      if (!!products) {
        console.log("products: ", product);
        setProducts(products);
      } else {
        // setProducts(productsData);
      }
    };

    fetchProducts();
    console.log("fetched products", products);
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleEditPhone = () => {
    router.push(`/?${createQueryString("to", searchParams.get("to") || "")}`);
  };
  const handleProductSelection = (productId: number) => {
    // update product context
    const selectedProduct: Product | undefined = products?.find((product) => {
      return product.id === productId;
    });
    onProductChange(selectedProduct ?? ({} as Product));

    router.push(
      `/send-topup/signup?${createQueryString("productId", productId.toString())}`,
    );
    console.log("topup product selected", productId);
  };

  const handleMenuSelectionChange = (menu: MenuType) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <Textt variant="h4-craftwork">You’re senRemytel top-up to</Textt>

      <div className="mt-5">
        <TopupToDetailCard
          phone={searchParams.get("to") || ""}
          onPhoneEdit={handleEditPhone}
        />
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
        </menu>

        <div className="mt-5">
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
        </div>
      </Card>
    </>
  );
}

export default TopUpAndPlans;
