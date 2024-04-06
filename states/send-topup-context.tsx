"use client";
import { Product } from "@/models";
import { LocalStorageUtil } from "@/utils";
import { createContext, useEffect, useState } from "react";

export interface ISendTopup {
  to: string;
  from: string;
  fromCountryCode: string;
  product: Product | undefined;
  topupFrequency: string | undefined;
}

const sendTopupContext = createContext<{
  sendTopup: ISendTopup;
  setSendTopup: (user: ISendTopup) => void;
}>({
  sendTopup: {
    ...LocalStorageUtil.getItem<ISendTopup>("sendtopup"),
  } as ISendTopup,
  setSendTopup: (user: ISendTopup) => {},
});

export const SendTopupContextProvider = (props: any) => {
  const [sendTopup, setSendTopUp] = useState<ISendTopup>({
    ...(LocalStorageUtil.getItem<ISendTopup>("sendtopup") ??
      ({} as ISendTopup)),
  });

  // Add a state variable to resolve hydration mismatch
  const [to, setTo] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [fromCountryCode, setFromCountryCode] = useState<string>("");
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    setTo(sendTopup.to);
    setFrom(sendTopup.from);
    setFromCountryCode(sendTopup.fromCountryCode);
    setProduct(sendTopup.product);
  }, [
    sendTopup.to,
    sendTopup.from,
    sendTopup.fromCountryCode,
    sendTopup.product,
  ]);

  const sendTopupHandler = (sendTopup: ISendTopup) => {
    setSendTopUp(sendTopup);
    LocalStorageUtil.setItem("sendtopup", sendTopup);
  };

  const contextValue = {
    sendTopup: { ...sendTopup, to, from, fromCountryCode, product },
    setSendTopup: sendTopupHandler,
  };

  return (
    <sendTopupContext.Provider value={contextValue}>
      {props.children}
    </sendTopupContext.Provider>
  );
};

export default sendTopupContext;
