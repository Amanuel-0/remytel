"use client";
import { Product } from "@/services";
import { createContext, useState } from "react";

const productContext = createContext<{
  product: Product;
  onProductChange: (product: Product) => void;
}>({
  product: {
    ...(JSON.parse(localStorage.getItem("product") ?? "{}") as Product),
  } as Product,
  onProductChange: (product: Product) => {},
});

export const ProductContextProvider = (props: any) => {
  const [product, setProduct] = useState<Product>({
    ...(JSON.parse(localStorage.getItem("product") ?? "{}") as Product),
  } as Product);

  const productHandler = (product: Product) => {
    setProduct(product);
    // store product to local storage
    localStorage.setItem("product", JSON.stringify(product));
  };

  const contextValue = {
    product: product,
    onProductChange: productHandler,
  };

  return (
    <productContext.Provider value={contextValue}>
      {props.children}
    </productContext.Provider>
  );
};

export default productContext;
