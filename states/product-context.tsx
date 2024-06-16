"use client";
import { Product, Price } from "@/models";
import { LocalStorageUtil } from "@/utils";
import { createContext, useCallback, useEffect, useState } from "react";

const productContext = createContext<{
  product: Product;
  onProductChange: (product: Product) => void;
}>({
  product: { ...LocalStorageUtil.getItem<Product>("product") } as Product,
  onProductChange: (product: Product) => {},
});

export const ProductContextProvider = (props: any) => {
  const [product, setProduct] = useState<Product>({
    ...LocalStorageUtil.getItem<Product>("product"),
  } as Product);

  // Add a state variable for all the product details to resolve hydration mismatch
  const [amount, setAmount] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [operator, setOperator] = useState<number>(0);
  const [operatorName, setOperatorName] = useState<string>("");
  const [price, setPrice] = useState<Price>();
  const [type, setType] = useState<"Airtime" | "Bundle" | "Data">();

  useEffect(() => {
    setAmount(product.amount);
    setUnit(product.unit);
    setDescription(product.description);
    setId(product.id);
    setName(product.name);
    setOperator(product.operator);
    setOperatorName(product.operator_name);
    setPrice(product.price);
    setType(product.type);
  }, [
    product.amount,
    product.unit,
    product.description,
    product.id,
    product.name,
    product.operator,
    product.operator_name,
    product?.price,
    product.type,
  ]);

  const productHandler = useCallback((product: Product) => {
    setProduct(product);
    LocalStorageUtil.setItem("product", product);
  }, []);

  const contextValue = {
    product: {
      ...product,
      amount,
      unit,
      description,
      id,
      name,
      operator,
      operator_name: operatorName,
      price: {
        ...product.price,
        amount: price?.amount,
        fee: price?.fee,
        currency: price?.currency,
        total: price?.total,
      },
      type,
    } as Product,
    onProductChange: productHandler,
  };

  return (
    <productContext.Provider value={contextValue}>
      {props.children}
    </productContext.Provider>
  );
};

export default productContext;
